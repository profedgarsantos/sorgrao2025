"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
  InputAdornment,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { ptBR } from "date-fns/locale"
import { useAuth } from "../../hooks/useAuth"
import { getOferta, createOferta, updateOferta } from "../../api/ofertas"
import { getProdutos } from "../../api/produtos"
import { getVendedores } from "../../api/vendedores"
import type { Produto } from "../../types/produto"
import type { Vendedor } from "../../types/vendedor"

const OfertaForm = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [vendedores, setVendedores] = useState<Vendedor[]>([])
  const [formData, setFormData] = useState({
    quantidade: "",
    valorunitario: "",
    valorunitariorevenda: "",
    validade: null as Date | null,
    distanciavendedor: "",
    tipoentrega: "",
    capacidadeexpedicao: "",
    vendedores_id: "",
    empresas_id: user?.empresas_id || 0,
    produtos_id: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isEditing = !!id

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true)
        try {
          // Carregar produtos e vendedores
          const [produtosData, vendedoresData] = await Promise.all([
            getProdutos(user.empresas_id),
            getVendedores(user.empresas_id),
          ])

          setProdutos(produtosData)
          setVendedores(vendedoresData)

          // Se estiver editando, carregar dados da oferta
          if (isEditing && id) {
            const ofertaData = await getOferta(Number.parseInt(id), user.empresas_id)
            setFormData({
              quantidade: ofertaData.quantidade?.toString() || "",
              valorunitario: ofertaData.valorunitario?.toString() || "",
              valorunitariorevenda: ofertaData.valorunitariorevenda?.toString() || "",
              validade: ofertaData.validade ? new Date(ofertaData.validade) : null,
              distanciavendedor: ofertaData.distanciavendedor?.toString() || "",
              tipoentrega: ofertaData.tipoentrega || "",
              capacidadeexpedicao: ofertaData.capacidadeexpedicao?.toString() || "",
              vendedores_id: ofertaData.vendedores_id?.toString() || "",
              empresas_id: ofertaData.empresas_id || user.empresas_id,
              produtos_id: ofertaData.produtos_id?.toString() || "",
            })
          }
        } catch (error) {
          console.error("Erro ao carregar dados:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [id, isEditing, user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target
    if (name) {
      setFormData({
        ...formData,
        [name]: value,
      })
      // Limpar erro quando o campo é alterado
      if (errors[name]) {
        setErrors({
          ...errors,
          [name]: "",
        })
      }
    }
  }

  const handleDateChange = (date: Date | null) => {
    setFormData({
      ...formData,
      validade: date,
    })
    if (errors.validade) {
      setErrors({
        ...errors,
        validade: "",
      })
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.quantidade) {
      newErrors.quantidade = "Quantidade é obrigatória"
    }

    if (!formData.valorunitario) {
      newErrors.valorunitario = "Valor unitário é obrigatório"
    }

    if (!formData.validade) {
      newErrors.validade = "Validade é obrigatória"
    }

    if (!formData.vendedores_id) {
      newErrors.vendedores_id = "Vendedor é obrigatório"
    }

    if (!formData.produtos_id) {
      newErrors.produtos_id = "Produto é obrigatório"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)

    try {
      const dataToSubmit = {
        ...formData,
        quantidade: Number.parseInt(formData.quantidade),
        valorunitario: Number.parseFloat(formData.valorunitario),
        valorunitariorevenda: formData.valorunitariorevenda
          ? Number.parseFloat(formData.valorunitariorevenda)
          : undefined,
        distanciavendedor: formData.distanciavendedor ? Number.parseInt(formData.distanciavendedor) : undefined,
        capacidadeexpedicao: formData.capacidadeexpedicao ? Number.parseInt(formData.capacidadeexpedicao) : undefined,
        vendedores_id: Number.parseInt(formData.vendedores_id),
        produtos_id: Number.parseInt(formData.produtos_id),
        validade: formData.validade ? formData.validade.toISOString().split("T")[0] : null,
      }

      if (isEditing && id) {
        await updateOferta(Number.parseInt(id), user?.empresas_id || 0, dataToSubmit)
      } else {
        await createOferta(dataToSubmit)
      }

      navigate("/ofertas")
    } catch (error) {
      console.error("Erro ao salvar oferta:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <Typography variant="h4" className="page-title">
        {isEditing ? "Editar Oferta" : "Nova Oferta"}
      </Typography>

      <Paper sx={{ p: 3 }} className="form-container">
        {loading && !isEditing ? (
          <CircularProgress />
        ) : (
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.produtos_id} className="form-field">
                    <InputLabel id="produto-label">Produto</InputLabel>
                    <Select
                      labelId="produto-label"
                      name="produtos_id"
                      value={formData.produtos_id}
                      onChange={handleChange}
                      label="Produto"
                    >
                      {produtos.map((produto) => (
                        <MenuItem key={produto.id} value={produto.id}>
                          {produto.nome} ({produto.tipounidade})
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.produtos_id && <FormHelperText>{errors.produtos_id}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth error={!!errors.vendedores_id} className="form-field">
                    <InputLabel id="vendedor-label">Vendedor</InputLabel>
                    <Select
                      labelId="vendedor-label"
                      name="vendedores_id"
                      value={formData.vendedores_id}
                      onChange={handleChange}
                      label="Vendedor"
                    >
                      {vendedores.map((vendedor) => (
                        <MenuItem key={vendedor.id} value={vendedor.id}>
                          {vendedor.user?.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.vendedores_id && <FormHelperText>{errors.vendedores_id}</FormHelperText>}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Quantidade"
                    name="quantidade"
                    type="number"
                    value={formData.quantidade}
                    onChange={handleChange}
                    error={!!errors.quantidade}
                    helperText={errors.quantidade}
                    className="form-field"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {produtos.find((p) => p.id === Number.parseInt(formData.produtos_id))?.tipounidade || ""}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Valor Unitário"
                    name="valorunitario"
                    type="number"
                    value={formData.valorunitario}
                    onChange={handleChange}
                    error={!!errors.valorunitario}
                    helperText={errors.valorunitario}
                    className="form-field"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Valor Unitário Revenda (opcional)"
                    name="valorunitariorevenda"
                    type="number"
                    value={formData.valorunitariorevenda}
                    onChange={handleChange}
                    className="form-field"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <DatePicker
                    label="Validade"
                    value={formData.validade}
                    onChange={handleDateChange}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.validade,
                        helperText: errors.validade,
                        className: "form-field",
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Distância do Vendedor (km)"
                    name="distanciavendedor"
                    type="number"
                    value={formData.distanciavendedor}
                    onChange={handleChange}
                    className="form-field"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth className="form-field">
                    <InputLabel id="tipoentrega-label">Tipo de Entrega</InputLabel>
                    <Select
                      labelId="tipoentrega-label"
                      name="tipoentrega"
                      value={formData.tipoentrega}
                      onChange={handleChange}
                      label="Tipo de Entrega"
                    >
                      <MenuItem value="CIF">CIF (Frete por conta do vendedor)</MenuItem>
                      <MenuItem value="FOB">FOB (Frete por conta do comprador)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Capacidade de Expedição (por dia)"
                    name="capacidadeexpedicao"
                    type="number"
                    value={formData.capacidadeexpedicao}
                    onChange={handleChange}
                    className="form-field"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {produtos.find((p) => p.id === Number.parseInt(formData.produtos_id))?.tipounidade || ""}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>

              <div className="form-actions">
                <Button type="submit" variant="contained" color="primary" disabled={loading}>
                  {loading ? "Salvando..." : "Salvar"}
                </Button>

                <Button variant="outlined" onClick={() => navigate("/ofertas")}>
                  Cancelar
                </Button>
              </div>
            </form>
          </LocalizationProvider>
        )}
      </Paper>
    </div>
  )
}

export default OfertaForm

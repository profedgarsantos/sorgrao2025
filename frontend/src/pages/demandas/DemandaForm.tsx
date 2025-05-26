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
import { getDemanda, createDemanda, updateDemanda } from "../../api/demandas"
import { getProdutos } from "../../api/produtos"
import type { Produto } from "../../types/produto"

const DemandaForm = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [formData, setFormData] = useState({
    quantidade: "",
    valorunitario: "",
    validade: null as Date | null,
    capacidaderecepcao: "",
    produtos_id: "",
    compradores_id: user?.id || 0,
    empresas_id: user?.empresas_id || 0,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isEditing = !!id

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true)
        try {
          // Carregar produtos
          const produtosData = await getProdutos(user.empresas_id)
          setProdutos(produtosData)

          // Se estiver editando, carregar dados da demanda
          if (isEditing && id) {
            const demandaData = await getDemanda(Number.parseInt(id), user.empresas_id)
            setFormData({
              quantidade: demandaData.quantidade?.toString() || "",
              valorunitario: demandaData.valorunitario?.toString() || "",
              validade: demandaData.validade ? new Date(demandaData.validade) : null,
              capacidaderecepcao: demandaData.capacidaderecepcao?.toString() || "",
              produtos_id: demandaData.produtos_id?.toString() || "",
              compradores_id: demandaData.compradores_id || user.id,
              empresas_id: demandaData.empresas_id || user.empresas_id,
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
        capacidaderecepcao: formData.capacidaderecepcao ? Number.parseInt(formData.capacidaderecepcao) : undefined,
        produtos_id: Number.parseInt(formData.produtos_id),
        validade: formData.validade ? formData.validade.toISOString().split("T")[0] : null,
      }

      if (isEditing && id) {
        await updateDemanda(Number.parseInt(id), user?.empresas_id || 0, dataToSubmit)
      } else {
        await createDemanda(dataToSubmit)
      }

      navigate("/demandas")
    } catch (error) {
      console.error("Erro ao salvar demanda:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <Typography variant="h4" className="page-title">
        {isEditing ? "Editar Demanda" : "Nova Demanda"}
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
                    label="Capacidade de Recepção (por dia)"
                    name="capacidaderecepcao"
                    type="number"
                    value={formData.capacidaderecepcao}
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

                <Button variant="outlined" onClick={() => navigate("/demandas")}>
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

export default DemandaForm

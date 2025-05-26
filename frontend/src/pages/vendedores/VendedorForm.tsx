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
} from "@mui/material"
import { useAuth } from "../../hooks/useAuth"
import { getVendedor, createVendedor, updateVendedor } from "../../api/vendedores"
import { getFunrurais } from "../../api/funrurais"
import type { Funrural } from "../../types/funrural"

const VendedorForm = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [funrurais, setFunrurais] = useState<Funrural[]>([])
  const [formData, setFormData] = useState({
    nomebanco: "",
    numerobanco: "",
    agencia: "",
    contacorrente: "",
    usuario_id: user?.id || 0,
    funrural_id: "",
    empresas_id: user?.empresas_id || 0,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isEditing = !!id

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setLoading(true)
        try {
          // Carregar funrurais
          const funruraisData = await getFunrurais(user.empresas_id)
          setFunrurais(funruraisData)

          // Se estiver editando, carregar dados do vendedor
          if (isEditing && id) {
            const vendedorData = await getVendedor(Number.parseInt(id), user.empresas_id)
            setFormData({
              nomebanco: vendedorData.nomebanco || "",
              numerobanco: vendedorData.numerobanco?.toString() || "",
              agencia: vendedorData.agencia || "",
              contacorrente: vendedorData.contacorrente || "",
              usuario_id: vendedorData.usuario_id || user.id,
              funrural_id: vendedorData.funrural_id?.toString() || "",
              empresas_id: vendedorData.empresas_id || user.empresas_id,
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

  const validate = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.nomebanco) {
      newErrors.nomebanco = "Nome do banco é obrigatório"
    }

    if (!formData.numerobanco) {
      newErrors.numerobanco = "Número do banco é obrigatório"
    }

    if (!formData.agencia) {
      newErrors.agencia = "Agência é obrigatória"
    }

    if (!formData.contacorrente) {
      newErrors.contacorrente = "Conta corrente é obrigatória"
    }

    if (!formData.funrural_id) {
      newErrors.funrural_id = "Funrural é obrigatório"
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
        numerobanco: Number.parseInt(formData.numerobanco),
        funrural_id: Number.parseInt(formData.funrural_id),
      }

      if (isEditing && id) {
        await updateVendedor(Number.parseInt(id), user?.empresas_id || 0, dataToSubmit)
      } else {
        await createVendedor(dataToSubmit)
      }

      navigate("/vendedores")
    } catch (error) {
      console.error("Erro ao salvar vendedor:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container">
      <Typography variant="h4" className="page-title">
        {isEditing ? "Editar Vendedor" : "Novo Vendedor"}
      </Typography>

      <Paper sx={{ p: 3 }} className="form-container">
        {loading && !isEditing ? (
          <CircularProgress />
        ) : (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nome do Banco"
                  name="nomebanco"
                  value={formData.nomebanco}
                  onChange={handleChange}
                  error={!!errors.nomebanco}
                  helperText={errors.nomebanco}
                  className="form-field"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Número do Banco"
                  name="numerobanco"
                  value={formData.numerobanco}
                  onChange={handleChange}
                  error={!!errors.numerobanco}
                  helperText={errors.numerobanco}
                  className="form-field"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Agência"
                  name="agencia"
                  value={formData.agencia}
                  onChange={handleChange}
                  error={!!errors.agencia}
                  helperText={errors.agencia}
                  className="form-field"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Conta Corrente"
                  name="contacorrente"
                  value={formData.contacorrente}
                  onChange={handleChange}
                  error={!!errors.contacorrente}
                  helperText={errors.contacorrente}
                  className="form-field"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.funrural_id} className="form-field">
                  <InputLabel id="funrural-label">Funrural</InputLabel>
                  <Select
                    labelId="funrural-label"
                    name="funrural_id"
                    value={formData.funrural_id}
                    onChange={handleChange}
                    label="Funrural"
                  >
                    {funrurais.map((funrural) => (
                      <MenuItem key={funrural.id} value={funrural.id}>
                        {funrural.descricao} ({funrural.valor}%)
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.funrural_id && <FormHelperText>{errors.funrural_id}</FormHelperText>}
                </FormControl>
              </Grid>
            </Grid>

            <div className="form-actions">
              <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {loading ? "Salvando..." : "Salvar"}
              </Button>

              <Button variant="outlined" onClick={() => navigate("/vendedores")}>
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </Paper>
    </div>
  )
}

export default VendedorForm

"use client"

import type React from "react"

import { useState } from "react"
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Box,
  Tabs,
  Tab,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material"
import { useAuth } from "../../hooks/useAuth"
import { useSnackbar } from "../../hooks/useSnackbar"
import api from "../../api/api"
import { maskPhone } from "../../utils/masks"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

const Perfil = () => {
  const { user, setUser } = useAuth()
  const { showSnackbar } = useSnackbar()
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [perfilData, setPerfilData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    telefone: user?.telefone || "",
  })

  const [senhaData, setSenhaData] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  })

  const [senhaErrors, setSenhaErrors] = useState({
    senhaAtual: "",
    novaSenha: "",
    confirmarSenha: "",
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handlePerfilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "telefone") {
      setPerfilData({
        ...perfilData,
        [name]: maskPhone(value),
      })
    } else {
      setPerfilData({
        ...perfilData,
        [name]: value,
      })
    }
  }

  const handleSenhaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setSenhaData({
      ...senhaData,
      [name]: value,
    })

    // Limpar erro quando o campo é alterado
    if (senhaErrors[name as keyof typeof senhaErrors]) {
      setSenhaErrors({
        ...senhaErrors,
        [name]: "",
      })
    }
  }

  const handlePerfilSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await api.patch(`/users/${user.id}`, perfilData)

      if (response.data) {
        setUser({
          ...user,
          ...response.data,
        })
        setSuccess("Perfil atualizado com sucesso!")
        showSnackbar("Perfil atualizado com sucesso!", "success")
      }
    } catch (err: any) {
      console.error("Erro ao atualizar perfil:", err)
      setError(err.response?.data?.message || "Erro ao atualizar perfil")
      showSnackbar("Erro ao atualizar perfil", "error")
    } finally {
      setLoading(false)
    }
  }

  const validateSenhaForm = () => {
    const errors = {
      senhaAtual: "",
      novaSenha: "",
      confirmarSenha: "",
    }

    if (!senhaData.senhaAtual) {
      errors.senhaAtual = "Senha atual é obrigatória"
    }

    if (!senhaData.novaSenha) {
      errors.novaSenha = "Nova senha é obrigatória"
    } else if (senhaData.novaSenha.length < 6) {
      errors.novaSenha = "A senha deve ter pelo menos 6 caracteres"
    }

    if (!senhaData.confirmarSenha) {
      errors.confirmarSenha = "Confirmação de senha é obrigatória"
    } else if (senhaData.novaSenha !== senhaData.confirmarSenha) {
      errors.confirmarSenha = "As senhas não coincidem"
    }

    setSenhaErrors(errors)
    return !Object.values(errors).some((error) => error)
  }

  const handleSenhaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    if (!validateSenhaForm()) {
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const response = await api.post(`/auth/change-password`, {
        userId: user.id,
        currentPassword: senhaData.senhaAtual,
        newPassword: senhaData.novaSenha,
      })

      if (response.data) {
        setSenhaData({
          senhaAtual: "",
          novaSenha: "",
          confirmarSenha: "",
        })
        setSuccess("Senha alterada com sucesso!")
        showSnackbar("Senha alterada com sucesso!", "success")
      }
    } catch (err: any) {
      console.error("Erro ao alterar senha:", err)
      setError(err.response?.data?.message || "Erro ao alterar senha")
      showSnackbar("Erro ao alterar senha", "error")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="page-container">
        <Typography>Usuário não autenticado</Typography>
      </div>
    )
  }

  return (
    <div className="page-container">
      <Typography variant="h4" className="page-title" gutterBottom>
        Meu Perfil
      </Typography>

      <Paper sx={{ width: "100%", mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="perfil tabs">
            <Tab label="Informações Pessoais" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="Alterar Senha" id="tab-1" aria-controls="tabpanel-1" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mb: 3 }}>
            <Avatar
              sx={{ width: 100, height: 100, mb: 2, fontSize: "2.5rem" }}
              alt={user.name}
              src={user.avatar || undefined}
            >
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {user.email}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handlePerfilSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="name"
                  value={perfilData.name}
                  onChange={handlePerfilChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={perfilData.email}
                  onChange={handlePerfilChange}
                  required
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Telefone"
                  name="telefone"
                  value={perfilData.telefone}
                  onChange={handlePerfilChange}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Salvar Alterações"}
              </Button>
            </Box>
          </form>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSenhaSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Senha Atual"
                  name="senhaAtual"
                  type="password"
                  value={senhaData.senhaAtual}
                  onChange={handleSenhaChange}
                  error={!!senhaErrors.senhaAtual}
                  helperText={senhaErrors.senhaAtual}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nova Senha"
                  name="novaSenha"
                  type="password"
                  value={senhaData.novaSenha}
                  onChange={handleSenhaChange}
                  error={!!senhaErrors.novaSenha}
                  helperText={senhaErrors.novaSenha}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Confirmar Nova Senha"
                  name="confirmarSenha"
                  type="password"
                  value={senhaData.confirmarSenha}
                  onChange={handleSenhaChange}
                  error={!!senhaErrors.confirmarSenha}
                  helperText={senhaErrors.confirmarSenha}
                  required
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Alterar Senha"}
              </Button>
            </Box>
          </form>
        </TabPanel>
      </Paper>
    </div>
  )
}

export default Perfil

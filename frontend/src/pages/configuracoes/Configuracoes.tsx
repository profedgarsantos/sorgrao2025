"use client"

import type React from "react"

import { useState } from "react"
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Tabs,
  Tab,
  Divider,
  FormControlLabel,
  Switch,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
} from "@mui/material"
import { useAuth } from "../../hooks/useAuth"
import { useSnackbar } from "../../hooks/useSnackbar"

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

const Configuracoes = () => {
  const { user } = useAuth()
  const { showSnackbar } = useSnackbar()
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const [empresaConfig, setEmpresaConfig] = useState({
    nome: "SorGrao",
    cnpj: "12.345.678/0001-90",
    email: "contato@sorgrao.com.br",
    telefone: "(11) 1234-5678",
    endereco: "Av. Paulista, 1000",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01310-100",
  })

  const [notificacoesConfig, setNotificacoesConfig] = useState({
    emailNovasOfertas: true,
    emailNovasDemandas: true,
    emailOfertasExpiradas: false,
    emailDemandasExpiradas: false,
    emailNegociacoesConcluidas: true,
  })

  const [sistemaConfig, setSistemaConfig] = useState({
    tempoSessao: "60",
    moeda: "BRL",
    idioma: "pt-BR",
    fuso: "America/Sao_Paulo",
  })

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleEmpresaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEmpresaConfig({
      ...empresaConfig,
      [name]: value,
    })
  }

  const handleNotificacoesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setNotificacoesConfig({
      ...notificacoesConfig,
      [name]: checked,
    })
  }

  const handleSistemaChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target
    if (name) {
      setSistemaConfig({
        ...sistemaConfig,
        [name]: value,
      })
    }
  }

  const handleEmpresaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Simulação de API - em um ambiente real, você enviaria para o endpoint correto
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Configurações da empresa atualizadas com sucesso!")
      showSnackbar("Configurações da empresa atualizadas com sucesso!", "success")
    } catch (err: any) {
      console.error("Erro ao atualizar configurações da empresa:", err)
      setError(err.response?.data?.message || "Erro ao atualizar configurações da empresa")
      showSnackbar("Erro ao atualizar configurações da empresa", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleNotificacoesSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Simulação de API - em um ambiente real, você enviaria para o endpoint correto
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Configurações de notificações atualizadas com sucesso!")
      showSnackbar("Configurações de notificações atualizadas com sucesso!", "success")
    } catch (err: any) {
      console.error("Erro ao atualizar configurações de notificações:", err)
      setError(err.response?.data?.message || "Erro ao atualizar configurações de notificações")
      showSnackbar("Erro ao atualizar configurações de notificações", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleSistemaSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      // Simulação de API - em um ambiente real, você enviaria para o endpoint correto
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Configurações do sistema atualizadas com sucesso!")
      showSnackbar("Configurações do sistema atualizadas com sucesso!", "success")
    } catch (err: any) {
      console.error("Erro ao atualizar configurações do sistema:", err)
      setError(err.response?.data?.message || "Erro ao atualizar configurações do sistema")
      showSnackbar("Erro ao atualizar configurações do sistema", "error")
    } finally {
      setLoading(false)
    }
  }

  if (!user || user.role !== "admin") {
    return (
      <div className="page-container">
        <Alert severity="warning">
          Você não tem permissão para acessar esta página. Apenas administradores podem gerenciar as configurações do
          sistema.
        </Alert>
      </div>
    )
  }

  return (
    <div className="page-container">
      <Typography variant="h4" className="page-title" gutterBottom>
        Configurações do Sistema
      </Typography>

      <Paper sx={{ width: "100%", mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="configurações tabs">
            <Tab label="Empresa" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="Notificações" id="tab-1" aria-controls="tabpanel-1" />
            <Tab label="Sistema" id="tab-2" aria-controls="tabpanel-2" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
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

          <form onSubmit={handleEmpresaSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nome da Empresa"
                  name="nome"
                  value={empresaConfig.nome}
                  onChange={handleEmpresaChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="CNPJ"
                  name="cnpj"
                  value={empresaConfig.cnpj}
                  onChange={handleEmpresaChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={empresaConfig.email}
                  onChange={handleEmpresaChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Telefone"
                  name="telefone"
                  value={empresaConfig.telefone}
                  onChange={handleEmpresaChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Endereço"
                  name="endereco"
                  value={empresaConfig.endereco}
                  onChange={handleEmpresaChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Cidade"
                  name="cidade"
                  value={empresaConfig.cidade}
                  onChange={handleEmpresaChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Estado"
                  name="estado"
                  value={empresaConfig.estado}
                  onChange={handleEmpresaChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="CEP"
                  name="cep"
                  value={empresaConfig.cep}
                  onChange={handleEmpresaChange}
                  required
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

          <form onSubmit={handleNotificacoesSubmit}>
            <Typography variant="h6" gutterBottom>
              Notificações por Email
            </Typography>
            <Divider sx={{ mb: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificacoesConfig.emailNovasOfertas}
                      onChange={handleNotificacoesChange}
                      name="emailNovasOfertas"
                    />
                  }
                  label="Receber notificações de novas ofertas"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificacoesConfig.emailNovasDemandas}
                      onChange={handleNotificacoesChange}
                      name="emailNovasDemandas"
                    />
                  }
                  label="Receber notificações de novas demandas"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificacoesConfig.emailOfertasExpiradas}
                      onChange={handleNotificacoesChange}
                      name="emailOfertasExpiradas"
                    />
                  }
                  label="Receber notificações de ofertas expiradas"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificacoesConfig.emailDemandasExpiradas}
                      onChange={handleNotificacoesChange}
                      name="emailDemandasExpiradas"
                    />
                  }
                  label="Receber notificações de demandas expiradas"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={notificacoesConfig.emailNegociacoesConcluidas}
                      onChange={handleNotificacoesChange}
                      name="emailNegociacoesConcluidas"
                    />
                  }
                  label="Receber notificações de negociações concluídas"
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

        <TabPanel value={tabValue} index={2}>
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

          <form onSubmit={handleSistemaSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Tempo de Sessão (minutos)"
                  name="tempoSessao"
                  type="number"
                  value={sistemaConfig.tempoSessao}
                  onChange={handleSistemaChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="moeda-label">Moeda</InputLabel>
                  <Select
                    labelId="moeda-label"
                    name="moeda"
                    value={sistemaConfig.moeda}
                    onChange={handleSistemaChange}
                    label="Moeda"
                  >
                    <MenuItem value="BRL">Real Brasileiro (R$)</MenuItem>
                    <MenuItem value="USD">Dólar Americano ($)</MenuItem>
                    <MenuItem value="EUR">Euro (€)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="idioma-label">Idioma</InputLabel>
                  <Select
                    labelId="idioma-label"
                    name="idioma"
                    value={sistemaConfig.idioma}
                    onChange={handleSistemaChange}
                    label="Idioma"
                  >
                    <MenuItem value="pt-BR">Português (Brasil)</MenuItem>
                    <MenuItem value="en-US">Inglês (EUA)</MenuItem>
                    <MenuItem value="es">Espanhol</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="fuso-label">Fuso Horário</InputLabel>
                  <Select
                    labelId="fuso-label"
                    name="fuso"
                    value={sistemaConfig.fuso}
                    onChange={handleSistemaChange}
                    label="Fuso Horário"
                  >
                    <MenuItem value="America/Sao_Paulo">Brasília (GMT-3)</MenuItem>
                    <MenuItem value="America/Manaus">Manaus (GMT-4)</MenuItem>
                    <MenuItem value="America/New_York">Nova York (GMT-5)</MenuItem>
                    <MenuItem value="Europe/London">Londres (GMT+0)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
              <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Salvar Alterações"}
              </Button>
            </Box>
          </form>
        </TabPanel>
      </Paper>
    </div>
  )
}

export default Configuracoes

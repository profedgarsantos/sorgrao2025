"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Typography,
  Grid,
  Paper,
  Tabs,
  Tab,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { ptBR } from "date-fns/locale"
import { format, startOfMonth, endOfMonth } from "date-fns"
import DownloadIcon from "@mui/icons-material/Download"
import { useAuth } from "../../hooks/useAuth"
import { getOfertas } from "../../api/ofertas"
import { getDemandas } from "../../api/demandas"
import { getProdutos } from "../../api/produtos"
import { formatCurrency, formatNumber, formatDate } from "../../utils/formatters"
import LoadingIndicator from "../../components/common/LoadingIndicator"
import ErrorMessage from "../../components/common/ErrorMessage"

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

const Relatorios = () => {
  const { user } = useAuth()
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [ofertas, setOfertas] = useState<any[]>([])
  const [demandas, setDemandas] = useState<any[]>([])
  const [produtos, setProdutos] = useState<any[]>([])
  const [filteredOfertas, setFilteredOfertas] = useState<any[]>([])
  const [filteredDemandas, setFilteredDemandas] = useState<any[]>([])
  const [dataInicio, setDataInicio] = useState<Date | null>(startOfMonth(new Date()))
  const [dataFim, setDataFim] = useState<Date | null>(endOfMonth(new Date()))
  const [produtoSelecionado, setProdutoSelecionado] = useState<string>("todos")

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          setLoading(true)
          const [ofertasData, demandasData, produtosData] = await Promise.all([
            getOfertas(user.empresas_id),
            getDemandas(user.empresas_id),
            getProdutos(user.empresas_id),
          ])

          setOfertas(ofertasData)
          setDemandas(demandasData)
          setProdutos(produtosData)
          setFilteredOfertas(ofertasData)
          setFilteredDemandas(demandasData)
          setError(null)
        } catch (err: any) {
          setError("Erro ao carregar dados dos relatórios")
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [user])

  useEffect(() => {
    // Filtrar ofertas e demandas com base nos filtros selecionados
    if (ofertas.length > 0) {
      let filtered = [...ofertas]

      if (dataInicio) {
        filtered = filtered.filter((oferta) => new Date(oferta.created_at) >= dataInicio)
      }

      if (dataFim) {
        filtered = filtered.filter((oferta) => new Date(oferta.created_at) <= dataFim)
      }

      if (produtoSelecionado !== "todos") {
        filtered = filtered.filter((oferta) => oferta.produtos_id === Number(produtoSelecionado))
      }

      setFilteredOfertas(filtered)
    }

    if (demandas.length > 0) {
      let filtered = [...demandas]

      if (dataInicio) {
        filtered = filtered.filter((demanda) => new Date(demanda.created_at) >= dataInicio)
      }

      if (dataFim) {
        filtered = filtered.filter((demanda) => new Date(demanda.created_at) <= dataFim)
      }

      if (produtoSelecionado !== "todos") {
        filtered = filtered.filter((demanda) => demanda.produtos_id === Number(produtoSelecionado))
      }

      setFilteredDemandas(filtered)
    }
  }, [dataInicio, dataFim, produtoSelecionado, ofertas, demandas])

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue)
  }

  const handleExportCSV = (data: any[], filename: string) => {
    if (data.length === 0) return

    // Obter cabeçalhos
    const headers = Object.keys(data[0])

    // Criar conteúdo CSV
    const csvContent = [
      headers.join(","), // Cabeçalhos
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            // Formatar valores especiais
            if (typeof value === "string" && value.includes(",")) {
              return `"${value}"`
            }
            return value
          })
          .join(","),
      ),
    ].join("\n")

    // Criar blob e link para download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}_${format(new Date(), "yyyy-MM-dd")}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return <LoadingIndicator message="Carregando dados dos relatórios..." />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  return (
    <div className="page-container">
      <Typography variant="h4" className="page-title">
        Relatórios
      </Typography>

      <Paper sx={{ width: "100%", mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="relatórios tabs">
            <Tab label="Ofertas" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="Demandas" id="tab-1" aria-controls="tabpanel-1" />
            <Tab label="Resumo" id="tab-2" aria-controls="tabpanel-2" />
          </Tabs>
        </Box>

        <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Data Início"
                  value={dataInicio}
                  onChange={setDataInicio}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DatePicker
                  label="Data Fim"
                  value={dataFim}
                  onChange={setDataFim}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <FormControl fullWidth size="small">
                  <InputLabel id="produto-select-label">Produto</InputLabel>
                  <Select
                    labelId="produto-select-label"
                    value={produtoSelecionado}
                    label="Produto"
                    onChange={(e) => setProdutoSelecionado(e.target.value)}
                  >
                    <MenuItem value="todos">Todos os produtos</MenuItem>
                    {produtos.map((produto) => (
                      <MenuItem key={produto.id} value={produto.id.toString()}>
                        {produto.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  onClick={() => {
                    if (tabValue === 0) {
                      handleExportCSV(filteredOfertas, "ofertas")
                    } else if (tabValue === 1) {
                      handleExportCSV(filteredDemandas, "demandas")
                    }
                  }}
                  fullWidth
                >
                  Exportar
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Produto</TableCell>
                  <TableCell>Quantidade</TableCell>
                  <TableCell>Valor Unitário</TableCell>
                  <TableCell>Valor Total</TableCell>
                  <TableCell>Vendedor</TableCell>
                  <TableCell>Data Criação</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOfertas.length > 0 ? (
                  filteredOfertas.map((oferta) => (
                    <TableRow key={oferta.id}>
                      <TableCell>{oferta.id}</TableCell>
                      <TableCell>{oferta.produto?.nome}</TableCell>
                      <TableCell>
                        {formatNumber(oferta.quantidade)} {oferta.produto?.tipounidade}
                      </TableCell>
                      <TableCell>{formatCurrency(oferta.valorunitario)}</TableCell>
                      <TableCell>{formatCurrency(oferta.quantidade * oferta.valorunitario)}</TableCell>
                      <TableCell>{oferta.vendedor?.user?.name}</TableCell>
                      <TableCell>{formatDate(oferta.created_at)}</TableCell>
                      <TableCell>
                        {oferta.cancelado
                          ? "Cancelada"
                          : oferta.validade < new Date().toISOString()
                            ? "Expirada"
                            : "Ativa"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Nenhuma oferta encontrada com os filtros selecionados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Produto</TableCell>
                  <TableCell>Quantidade</TableCell>
                  <TableCell>Valor Unitário</TableCell>
                  <TableCell>Valor Total</TableCell>
                  <TableCell>Comprador</TableCell>
                  <TableCell>Data Criação</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDemandas.length > 0 ? (
                  filteredDemandas.map((demanda) => (
                    <TableRow key={demanda.id}>
                      <TableCell>{demanda.id}</TableCell>
                      <TableCell>{demanda.produto?.nome}</TableCell>
                      <TableCell>
                        {formatNumber(demanda.quantidade)} {demanda.produto?.tipounidade}
                      </TableCell>
                      <TableCell>{formatCurrency(demanda.valorunitario)}</TableCell>
                      <TableCell>{formatCurrency(demanda.quantidade * demanda.valorunitario)}</TableCell>
                      <TableCell>{demanda.comprador?.user?.name}</TableCell>
                      <TableCell>{formatDate(demanda.created_at)}</TableCell>
                      <TableCell>
                        {demanda.cancelado
                          ? "Cancelada"
                          : demanda.finalizado
                            ? "Finalizada"
                            : demanda.validade < new Date().toISOString()
                              ? "Expirada"
                              : "Ativa"}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} align="center">
                      Nenhuma demanda encontrada com os filtros selecionados
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Resumo de Ofertas
                </Typography>
                <Typography variant="body1">
                  Total de Ofertas: <strong>{filteredOfertas.length}</strong>
                </Typography>
                <Typography variant="body1">
                  Ofertas Ativas:{" "}
                  <strong>
                    {filteredOfertas.filter((o) => !o.cancelado && new Date(o.validade) >= new Date()).length}
                  </strong>
                </Typography>
                <Typography variant="body1">
                  Ofertas Canceladas: <strong>{filteredOfertas.filter((o) => o.cancelado).length}</strong>
                </Typography>
                <Typography variant="body1">
                  Valor Total:{" "}
                  <strong>
                    {formatCurrency(filteredOfertas.reduce((acc, o) => acc + o.quantidade * o.valorunitario, 0))}
                  </strong>
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Resumo de Demandas
                </Typography>
                <Typography variant="body1">
                  Total de Demandas: <strong>{filteredDemandas.length}</strong>
                </Typography>
                <Typography variant="body1">
                  Demandas Ativas:{" "}
                  <strong>
                    {
                      filteredDemandas.filter(
                        (d) => !d.cancelado && !d.finalizado && new Date(d.validade) >= new Date(),
                      ).length
                    }
                  </strong>
                </Typography>
                <Typography variant="body1">
                  Demandas Finalizadas: <strong>{filteredDemandas.filter((d) => d.finalizado).length}</strong>
                </Typography>
                <Typography variant="body1">
                  Demandas Canceladas: <strong>{filteredDemandas.filter((d) => d.cancelado).length}</strong>
                </Typography>
                <Typography variant="body1">
                  Valor Total:{" "}
                  <strong>
                    {formatCurrency(filteredDemandas.reduce((acc, d) => acc + d.quantidade * d.valorunitario, 0))}
                  </strong>
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Produtos mais negociados
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Produto</TableCell>
                        <TableCell>Ofertas</TableCell>
                        <TableCell>Demandas</TableCell>
                        <TableCell>Total Quantidade (Ofertas)</TableCell>
                        <TableCell>Total Quantidade (Demandas)</TableCell>
                        <TableCell>Valor Médio (Ofertas)</TableCell>
                        <TableCell>Valor Médio (Demandas)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {produtos.map((produto) => {
                        const ofertasDoProduto = filteredOfertas.filter((o) => o.produtos_id === produto.id)
                        const demandasDoProduto = filteredDemandas.filter((d) => d.produtos_id === produto.id)

                        const totalQuantidadeOfertas = ofertasDoProduto.reduce((acc, o) => acc + o.quantidade, 0)
                        const totalQuantidadeDemandas = demandasDoProduto.reduce((acc, d) => acc + d.quantidade, 0)

                        const valorMedioOfertas =
                          ofertasDoProduto.length > 0
                            ? ofertasDoProduto.reduce((acc, o) => acc + o.valorunitario, 0) / ofertasDoProduto.length
                            : 0

                        const valorMedioDemandas =
                          demandasDoProduto.length > 0
                            ? demandasDoProduto.reduce((acc, d) => acc + d.valorunitario, 0) / demandasDoProduto.length
                            : 0

                        return (
                          <TableRow key={produto.id}>
                            <TableCell>{produto.nome}</TableCell>
                            <TableCell>{ofertasDoProduto.length}</TableCell>
                            <TableCell>{demandasDoProduto.length}</TableCell>
                            <TableCell>
                              {formatNumber(totalQuantidadeOfertas)} {produto.tipounidade}
                            </TableCell>
                            <TableCell>
                              {formatNumber(totalQuantidadeDemandas)} {produto.tipounidade}
                            </TableCell>
                            <TableCell>{formatCurrency(valorMedioOfertas)}</TableCell>
                            <TableCell>{formatCurrency(valorMedioDemandas)}</TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>
    </div>
  )
}

export default Relatorios

"use client"

import { useState, useEffect } from "react"
import { Typography, Grid, Card, CardContent, CardHeader, Paper, Box, Divider } from "@mui/material"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useAuth } from "../hooks/useAuth"
import { getOfertas } from "../api/ofertas"
import { getDemandas } from "../api/demandas"
import { getVendedores } from "../api/vendedores"
import { getProdutos } from "../api/produtos"
import { formatCurrency, formatNumber } from "../utils/formatters"
import LoadingIndicator from "../components/common/LoadingIndicator"
import ErrorMessage from "../components/common/ErrorMessage"
import type React from "react"
import { useEnvironment } from "../hooks/useEnvironment"
import { useFeature } from "../config/features"
import { useRemoteConfig } from "../services/configService"
import { useApi } from "../hooks/useApi"

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export const Dashboard: React.FC = () => {
  const env = useEnvironment()
  const showNewDashboard = useFeature("enableNewDashboard")
  const { config: remoteConfig, loading: configLoading } = useRemoteConfig()
  const { data: stats, loading: statsLoading } = useApi("/dashboard/stats", {})

  const { user } = useAuth()
  const [ofertas, setOfertas] = useState<any[]>([])
  const [demandas, setDemandas] = useState<any[]>([])
  const [vendedores, setVendedores] = useState<any[]>([])
  const [produtos, setProdutos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          setLoading(true)
          const [ofertasData, demandasData, vendedoresData, produtosData] = await Promise.all([
            getOfertas(user.empresas_id),
            getDemandas(user.empresas_id),
            getVendedores(user.empresas_id),
            getProdutos(user.empresas_id),
          ])

          setOfertas(ofertasData)
          setDemandas(demandasData)
          setVendedores(vendedoresData)
          setProdutos(produtosData)
          setError(null)
        } catch (err: any) {
          setError("Erro ao carregar dados do dashboard")
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [user])

  // Preparar dados para os gráficos
  const prepareProductData = () => {
    const productData = produtos.map((produto) => {
      const ofertasDoProduto = ofertas.filter((o) => o.produtos_id === produto.id && !o.cancelado)
      const demandasDoProduto = demandas.filter((d) => d.produtos_id === produto.id && !d.cancelado && !d.finalizado)

      return {
        name: produto.nome,
        ofertas: ofertasDoProduto.length,
        demandas: demandasDoProduto.length,
        quantidadeOfertas: ofertasDoProduto.reduce((acc, o) => acc + o.quantidade, 0),
        quantidadeDemandas: demandasDoProduto.reduce((acc, d) => acc + d.quantidade, 0),
      }
    })

    return productData.sort((a, b) => b.ofertas + b.demandas - (a.ofertas + a.demandas)).slice(0, 5)
  }

  const prepareVendedoresData = () => {
    return vendedores
      .map((vendedor) => {
        const ofertasDoVendedor = ofertas.filter((o) => o.vendedores_id === vendedor.id && !o.cancelado)

        return {
          name: vendedor.user?.name || `Vendedor ${vendedor.id}`,
          value: ofertasDoVendedor.length,
          quantidade: ofertasDoVendedor.reduce((acc, o) => acc + o.quantidade, 0),
        }
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
  }

  const prepareStatusData = () => {
    const ofertasAtivas = ofertas.filter((o) => !o.cancelado && new Date(o.validade) >= new Date()).length
    const ofertasCanceladas = ofertas.filter((o) => o.cancelado).length
    const ofertasExpiradas = ofertas.filter((o) => !o.cancelado && new Date(o.validade) < new Date()).length

    const demandasAtivas = demandas.filter(
      (d) => !d.cancelado && !d.finalizado && new Date(d.validade) >= new Date(),
    ).length
    const demandasCanceladas = demandas.filter((d) => d.cancelado).length
    const demandasFinalizadas = demandas.filter((d) => d.finalizado).length
    const demandasExpiradas = demandas.filter(
      (d) => !d.cancelado && !d.finalizado && new Date(d.validade) < new Date(),
    ).length

    return [
      { name: "Ofertas Ativas", value: ofertasAtivas },
      { name: "Ofertas Canceladas", value: ofertasCanceladas },
      { name: "Ofertas Expiradas", value: ofertasExpiradas },
      { name: "Demandas Ativas", value: demandasAtivas },
      { name: "Demandas Canceladas", value: demandasCanceladas },
      { name: "Demandas Finalizadas", value: demandasFinalizadas },
      { name: "Demandas Expiradas", value: demandasExpiradas },
    ]
  }

  // Mostrar mensagem de manutenção se necessário
  if (remoteConfig?.maintenanceMode) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4">Sistema em Manutenção</Typography>
        <Typography>Estamos realizando melhorias. Por favor, tente novamente mais tarde.</Typography>
      </Box>
    )
  }

  // Mostrar anúncio se disponível
  const renderAnnouncement = () => {
    if (remoteConfig?.announcementMessage) {
      return (
        <Paper sx={{ p: 2, mb: 3, bgcolor: "info.light", color: "info.contrastText" }}>
          <Typography>{remoteConfig.announcementMessage}</Typography>
        </Paper>
      )
    }
    return null
  }

  if (loading || configLoading || statsLoading) {
    return <LoadingIndicator message="Carregando dados do dashboard..." />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  const productData = prepareProductData()
  const vendedoresData = prepareVendedoresData()
  const statusData = prepareStatusData()

  return (
    <Box>
      {renderAnnouncement()}

      <Typography variant="h4" gutterBottom>
        Dashboard {showNewDashboard ? "2.0" : ""}
      </Typography>

      {/* Conteúdo condicional baseado em feature flags */}
      {showNewDashboard ? (
        <Grid container spacing={3}>
          {/* Novo layout de dashboard */}
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {/* Layout de dashboard original */}
          <Grid container spacing={3}>
            {/* Cards de resumo */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader title="Ofertas Ativas" />
                <CardContent>
                  <Typography variant="h3" className="card-value">
                    {ofertas.filter((o) => !o.cancelado && new Date(o.validade) >= new Date()).length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader title="Demandas Ativas" />
                <CardContent>
                  <Typography variant="h3" className="card-value">
                    {demandas.filter((d) => !d.cancelado && !d.finalizado && new Date(d.validade) >= new Date()).length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card>
                <CardHeader title="Vendedores" />
                <CardContent>
                  <Typography variant="h3" className="card-value">
                    {vendedores.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Gráfico de produtos */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2, height: 400 }}>
                <Typography variant="h6" gutterBottom>
                  Produtos mais negociados
                </Typography>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart
                    data={productData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [value, ""]} />
                    <Legend />
                    <Bar dataKey="ofertas" fill="#8884d8" name="Ofertas" />
                    <Bar dataKey="demandas" fill="#82ca9d" name="Demandas" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Gráfico de vendedores */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2, height: 400 }}>
                <Typography variant="h6" gutterBottom>
                  Top Vendedores
                </Typography>
                <ResponsiveContainer width="100%" height="90%">
                  <PieChart>
                    <Pie
                      data={vendedoresData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {vendedoresData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name, props) => [`${value} ofertas`, props.payload.name]} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Gráfico de status */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2, height: 400 }}>
                <Typography variant="h6" gutterBottom>
                  Status de Ofertas e Demandas
                </Typography>
                <ResponsiveContainer width="100%" height="90%">
                  <BarChart
                    data={statusData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#8884d8" name="Quantidade" />
                  </BarChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            {/* Últimas ofertas e demandas */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Últimas Ofertas
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {ofertas.length > 0 ? (
                  <Box component="ul" sx={{ pl: 2 }}>
                    {ofertas
                      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                      .slice(0, 5)
                      .map((oferta) => (
                        <Box component="li" key={oferta.id} sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            <strong>{oferta.produto?.nome}</strong> - {formatNumber(oferta.quantidade)}{" "}
                            {oferta.produto?.tipounidade} - {formatCurrency(oferta.valorunitario)} por{" "}
                            {oferta.vendedor?.user?.name}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                ) : (
                  <Typography>Nenhuma oferta encontrada</Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Últimas Demandas
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {demandas.length > 0 ? (
                  <Box component="ul" sx={{ pl: 2 }}>
                    {demandas
                      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                      .slice(0, 5)
                      .map((demanda) => (
                        <Box component="li" key={demanda.id} sx={{ mb: 1 }}>
                          <Typography variant="body2">
                            <strong>{demanda.produto?.nome}</strong> - {formatNumber(demanda.quantidade)}{" "}
                            {demanda.produto?.tipounidade} - {formatCurrency(demanda.valorunitario)} por{" "}
                            {demanda.comprador?.user?.name}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                ) : (
                  <Typography>Nenhuma demanda encontrada</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* Informações de debug em ambientes não-produção */}
      {!env.isProduction && (
        <Paper sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6">Informações de Debug</Typography>
          <pre>{JSON.stringify({ env, remoteConfig, stats }, null, 2)}</pre>
        </Paper>
      )}
    </Box>
  )
}

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
  CardHeader,
  Divider,
} from "@mui/material"
import { useAuth } from "../../hooks/useAuth"
import { getOfertas } from "../../api/ofertas"
import { calcularOfertaCompleta, type ResultadoCalculo } from "../../api/calculadora"
import type { Oferta } from "../../types/oferta"

const Calculadora = () => {
  const { user } = useAuth()
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [loading, setLoading] = useState(false)
  const [calculando, setCalculando] = useState(false)
  const [formData, setFormData] = useState({
    ofertaId: "",
    comissionadoId: user?.id || 0,
    distancia: "",
    percentualComissao: "2.5",
  })
  const [resultado, setResultado] = useState<ResultadoCalculo | null>(null)
  const [ofertaSelecionada, setOfertaSelecionada] = useState<Oferta | null>(null)

  useEffect(() => {
    const fetchOfertas = async () => {
      if (user) {
        setLoading(true)
        try {
          const data = await getOfertas(user.empresas_id)
          setOfertas(data.filter((oferta: Oferta) => !oferta.cancelado))
        } catch (error) {
          console.error("Erro ao carregar ofertas:", error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchOfertas()
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target
    if (name) {
      setFormData({
        ...formData,
        [name]: value,
      })

      // Se a oferta foi alterada, atualiza a oferta selecionada
      if (name === "ofertaId" && value) {
        const oferta = ofertas.find((o) => o.id === Number.parseInt(value as string))
        setOfertaSelecionada(oferta || null)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.ofertaId || !formData.distancia) {
      alert("Por favor, preencha todos os campos obrigatórios")
      return
    }

    setCalculando(true)

    try {
      const result = await calcularOfertaCompleta({
        ofertaId: Number.parseInt(formData.ofertaId),
        comissionadoId: formData.comissionadoId,
        distancia: Number.parseInt(formData.distancia),
        percentualComissao: Number.parseFloat(formData.percentualComissao),
      })

      setResultado(result)
    } catch (error) {
      console.error("Erro ao calcular oferta:", error)
      alert("Erro ao realizar o cálculo")
    } finally {
      setCalculando(false)
    }
  }

  return (
    <div className="page-container">
      <Typography variant="h4" className="page-title">
        Calculadora de Preços
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Parâmetros de Cálculo
            </Typography>

            <form onSubmit={handleSubmit}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="oferta-label">Oferta</InputLabel>
                <Select
                  labelId="oferta-label"
                  name="ofertaId"
                  value={formData.ofertaId}
                  onChange={handleChange}
                  label="Oferta"
                  disabled={loading}
                >
                  {ofertas.map((oferta) => (
                    <MenuItem key={oferta.id} value={oferta.id}>
                      {oferta.produto?.nome} - {oferta.quantidade} {oferta.produto?.tipounidade} - R${" "}
                      {oferta.valorunitario.toFixed(2)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Distância (km)"
                name="distancia"
                type="number"
                value={formData.distancia}
                onChange={handleChange}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Percentual de Comissão (%)"
                name="percentualComissao"
                type="number"
                value={formData.percentualComissao}
                onChange={handleChange}
                sx={{ mb: 2 }}
                inputProps={{ step: "0.1" }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={calculando || !formData.ofertaId}
              >
                {calculando ? "Calculando..." : "Calcular"}
              </Button>
            </form>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          {ofertaSelecionada && (
            <Card sx={{ mb: 3 }}>
              <CardHeader title="Detalhes da Oferta" />
              <CardContent>
                <Typography>
                  <strong>Produto:</strong> {ofertaSelecionada.produto?.nome}
                </Typography>
                <Typography>
                  <strong>Quantidade:</strong> {ofertaSelecionada.quantidade} {ofertaSelecionada.produto?.tipounidade}
                </Typography>
                <Typography>
                  <strong>Valor Unitário:</strong> R$ {ofertaSelecionada.valorunitario.toFixed(2)}
                </Typography>
                <Typography>
                  <strong>Valor Total:</strong> R${" "}
                  {(ofertaSelecionada.valorunitario * ofertaSelecionada.quantidade).toFixed(2)}
                </Typography>
                <Typography>
                  <strong>Vendedor:</strong> {ofertaSelecionada.vendedor?.user?.name}
                </Typography>
              </CardContent>
            </Card>
          )}

          {resultado && (
            <Card>
              <CardHeader title="Resultado do Cálculo" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Valor Funrural:</Typography>
                    <Typography variant="h6">R$ {resultado.valorFunrural.toFixed(2)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Valor Frete:</Typography>
                    <Typography variant="h6">R$ {resultado.valorFrete.toFixed(2)}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle1">Valor Comissão:</Typography>
                    <Typography variant="h6">R$ {resultado.valorComissao.toFixed(2)}</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle1">Valor Final:</Typography>
                    <Typography variant="h4" color="primary">
                      R$ {resultado.valorFinal.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </div>
  )
}

export default Calculadora

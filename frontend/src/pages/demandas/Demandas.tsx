"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  Box,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import CancelIcon from "@mui/icons-material/Cancel"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useAuth } from "../../hooks/useAuth"
import { getDemandas, deleteDemanda, updateDemanda } from "../../api/demandas"
import type { Demanda } from "../../types/demanda"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const Demandas = () => {
  const { user } = useAuth()
  const [demandas, setDemandas] = useState<Demanda[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDemandas = async () => {
      if (user) {
        try {
          setLoading(true)
          const data = await getDemandas(user.empresas_id)
          setDemandas(data)
          setError(null)
        } catch (err: any) {
          setError("Erro ao carregar demandas")
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchDemandas()
  }, [user])

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta demanda?")) {
      try {
        if (user) {
          await deleteDemanda(id, user.empresas_id)
          setDemandas(demandas.filter((demanda) => demanda.id !== id))
        }
      } catch (err) {
        console.error("Erro ao excluir demanda:", err)
        alert("Erro ao excluir demanda")
      }
    }
  }

  const handleCancel = async (id: number) => {
    if (window.confirm("Tem certeza que deseja cancelar esta demanda?")) {
      try {
        if (user) {
          const demanda = demandas.find((d) => d.id === id)
          if (demanda) {
            await updateDemanda(id, user.empresas_id, { ...demanda, cancelado: true })
            setDemandas(demandas.map((d) => (d.id === id ? { ...d, cancelado: true } : d)))
          }
        }
      } catch (err) {
        console.error("Erro ao cancelar demanda:", err)
        alert("Erro ao cancelar demanda")
      }
    }
  }

  const handleFinalize = async (id: number) => {
    if (window.confirm("Tem certeza que deseja finalizar esta demanda?")) {
      try {
        if (user) {
          const demanda = demandas.find((d) => d.id === id)
          if (demanda) {
            await updateDemanda(id, user.empresas_id, { ...demanda, finalizado: true })
            setDemandas(demandas.map((d) => (d.id === id ? { ...d, finalizado: true } : d)))
          }
        }
      } catch (err) {
        console.error("Erro ao finalizar demanda:", err)
        alert("Erro ao finalizar demanda")
      }
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd/MM/yyyy", { locale: ptBR })
    } catch (error) {
      return dateString
    }
  }

  const getStatusChip = (demanda: Demanda) => {
    if (demanda.cancelado) {
      return <Chip label="Cancelada" color="error" size="small" />
    } else if (demanda.finalizado) {
      return <Chip label="Finalizada" color="info" size="small" />
    } else {
      return <Chip label="Ativa" color="success" size="small" />
    }
  }

  if (loading) {
    return <Typography>Carregando...</Typography>
  }

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

  return (
    <div className="page-container">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <Typography variant="h4" className="page-title">
          Demandas
        </Typography>
        <Button component={Link} to="/demandas/novo" variant="contained" color="primary" startIcon={<AddIcon />}>
          Nova Demanda
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Produto</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Valor Unitário</TableCell>
              <TableCell>Validade</TableCell>
              <TableCell>Comprador</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {demandas.length > 0 ? (
              demandas.map((demanda) => (
                <TableRow
                  key={demanda.id}
                  sx={{
                    opacity: demanda.cancelado ? 0.6 : 1,
                    backgroundColor: demanda.finalizado ? "rgba(0, 0, 0, 0.04)" : "inherit",
                  }}
                >
                  <TableCell>{demanda.id}</TableCell>
                  <TableCell>{demanda.produto?.nome}</TableCell>
                  <TableCell>
                    {demanda.quantidade} {demanda.produto?.tipounidade}
                  </TableCell>
                  <TableCell>R$ {demanda.valorunitario.toFixed(2)}</TableCell>
                  <TableCell>{formatDate(demanda.validade)}</TableCell>
                  <TableCell>{demanda.comprador?.user?.name}</TableCell>
                  <TableCell>{getStatusChip(demanda)}</TableCell>
                  <TableCell>
                    <Box className="table-actions">
                      {!demanda.cancelado && !demanda.finalizado && (
                        <>
                          <Tooltip title="Editar">
                            <IconButton component={Link} to={`/demandas/${demanda.id}`} color="primary" size="small">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Finalizar">
                            <IconButton onClick={() => handleFinalize(demanda.id)} color="info" size="small">
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancelar">
                            <IconButton onClick={() => handleCancel(demanda.id)} color="warning" size="small">
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      <Tooltip title="Excluir">
                        <IconButton onClick={() => handleDelete(demanda.id)} color="error" size="small">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Nenhuma demanda encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Demandas

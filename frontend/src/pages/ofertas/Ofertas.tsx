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
import { useAuth } from "../../hooks/useAuth"
import { getOfertas, deleteOferta, updateOferta } from "../../api/ofertas"
import type { Oferta } from "../../types/oferta"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

const Ofertas = () => {
  const { user } = useAuth()
  const [ofertas, setOfertas] = useState<Oferta[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOfertas = async () => {
      if (user) {
        try {
          setLoading(true)
          const data = await getOfertas(user.empresas_id)
          setOfertas(data)
          setError(null)
        } catch (err: any) {
          setError("Erro ao carregar ofertas")
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchOfertas()
  }, [user])

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta oferta?")) {
      try {
        if (user) {
          await deleteOferta(id, user.empresas_id)
          setOfertas(ofertas.filter((oferta) => oferta.id !== id))
        }
      } catch (err) {
        console.error("Erro ao excluir oferta:", err)
        alert("Erro ao excluir oferta")
      }
    }
  }

  const handleCancel = async (id: number) => {
    if (window.confirm("Tem certeza que deseja cancelar esta oferta?")) {
      try {
        if (user) {
          const oferta = ofertas.find((o) => o.id === id)
          if (oferta) {
            await updateOferta(id, user.empresas_id, { ...oferta, cancelado: true })
            setOfertas(ofertas.map((o) => (o.id === id ? { ...o, cancelado: true } : o)))
          }
        }
      } catch (err) {
        console.error("Erro ao cancelar oferta:", err)
        alert("Erro ao cancelar oferta")
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
          Ofertas
        </Typography>
        <Button component={Link} to="/ofertas/novo" variant="contained" color="primary" startIcon={<AddIcon />}>
          Nova Oferta
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
              <TableCell>Vendedor</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ofertas.length > 0 ? (
              ofertas.map((oferta) => (
                <TableRow key={oferta.id} sx={{ opacity: oferta.cancelado ? 0.6 : 1 }}>
                  <TableCell>{oferta.id}</TableCell>
                  <TableCell>{oferta.produto?.nome}</TableCell>
                  <TableCell>
                    {oferta.quantidade} {oferta.produto?.tipounidade}
                  </TableCell>
                  <TableCell>R$ {oferta.valorunitario.toFixed(2)}</TableCell>
                  <TableCell>{formatDate(oferta.validade)}</TableCell>
                  <TableCell>{oferta.vendedor?.user?.name}</TableCell>
                  <TableCell>
                    {oferta.cancelado ? (
                      <Chip label="Cancelada" color="error" size="small" />
                    ) : (
                      <Chip label="Ativa" color="success" size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Box className="table-actions">
                      {!oferta.cancelado && (
                        <>
                          <Tooltip title="Editar">
                            <IconButton component={Link} to={`/ofertas/${oferta.id}`} color="primary" size="small">
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Cancelar">
                            <IconButton onClick={() => handleCancel(oferta.id)} color="warning" size="small">
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        </>
                      )}
                      <Tooltip title="Excluir">
                        <IconButton onClick={() => handleDelete(oferta.id)} color="error" size="small">
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
                  Nenhuma oferta encontrada
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Ofertas

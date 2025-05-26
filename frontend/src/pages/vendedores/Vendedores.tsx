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
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { useAuth } from "../../hooks/useAuth"
import { getVendedores, deleteVendedor } from "../../api/vendedores"
import type { Vendedor } from "../../types/vendedor"

const Vendedores = () => {
  const { user } = useAuth()
  const [vendedores, setVendedores] = useState<Vendedor[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVendedores = async () => {
      if (user) {
        try {
          setLoading(true)
          const data = await getVendedores(user.empresas_id)
          setVendedores(data)
          setError(null)
        } catch (err: any) {
          setError("Erro ao carregar vendedores")
          console.error(err)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchVendedores()
  }, [user])

  const handleDelete = async (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir este vendedor?")) {
      try {
        if (user) {
          await deleteVendedor(id, user.empresas_id)
          setVendedores(vendedores.filter((vendedor) => vendedor.id !== id))
        }
      } catch (err) {
        console.error("Erro ao excluir vendedor:", err)
        alert("Erro ao excluir vendedor")
      }
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
          Vendedores
        </Typography>
        <Button component={Link} to="/vendedores/novo" variant="contained" color="primary" startIcon={<AddIcon />}>
          Novo Vendedor
        </Button>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Banco</TableCell>
              <TableCell>Agência</TableCell>
              <TableCell>Conta</TableCell>
              <TableCell>Funrural</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendedores.length > 0 ? (
              vendedores.map((vendedor) => (
                <TableRow key={vendedor.id}>
                  <TableCell>{vendedor.id}</TableCell>
                  <TableCell>{vendedor.user?.name}</TableCell>
                  <TableCell>{vendedor.nomebanco}</TableCell>
                  <TableCell>{vendedor.agencia}</TableCell>
                  <TableCell>{vendedor.contacorrente}</TableCell>
                  <TableCell>{vendedor.funrural?.descricao}</TableCell>
                  <TableCell>
                    <div className="table-actions">
                      <Tooltip title="Editar">
                        <IconButton component={Link} to={`/vendedores/${vendedor.id}`} color="primary" size="small">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Excluir">
                        <IconButton onClick={() => handleDelete(vendedor.id)} color="error" size="small">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  Nenhum vendedor encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Vendedores

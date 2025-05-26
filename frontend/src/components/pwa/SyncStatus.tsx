"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  Badge,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  DialogActions,
  Button,
} from "@mui/material"
import SyncIcon from "@mui/icons-material/Sync"
import { getPendingOperations, type PendingOperation } from "../../services/offlineStorage"

const SyncStatus: React.FC = () => {
  const [pendingOperations, setPendingOperations] = useState<PendingOperation[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    const checkPendingOperations = async () => {
      const operations = await getPendingOperations()
      setPendingOperations(operations)
    }

    checkPendingOperations()

    // Verificar operações pendentes a cada 30 segundos
    const interval = setInterval(checkPendingOperations, 30000)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
      clearInterval(interval)
    }
  }, [])

  const handleOpenDialog = () => {
    setDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setDialogOpen(false)
  }

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString()
  }

  const formatMethod = (method: string) => {
    switch (method.toUpperCase()) {
      case "POST":
        return "Criação"
      case "PUT":
        return "Atualização"
      case "DELETE":
        return "Exclusão"
      default:
        return method
    }
  }

  const formatUrl = (url: string) => {
    const parts = url.split("/")
    return parts[parts.length - 1] || url
  }

  if (pendingOperations.length === 0) {
    return null
  }

  return (
    <>
      <Tooltip title="Operações pendentes de sincronização">
        <IconButton color="inherit" onClick={handleOpenDialog}>
          <Badge badgeContent={pendingOperations.length} color="error">
            <SyncIcon />
          </Badge>
        </IconButton>
      </Tooltip>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Operações Pendentes de Sincronização</DialogTitle>
        <DialogContent>
          {isOnline ? (
            <p>Estas operações serão sincronizadas automaticamente quando houver conexão estável.</p>
          ) : (
            <p>Estas operações serão sincronizadas quando você estiver online novamente.</p>
          )}
          <List>
            {pendingOperations.map((op) => (
              <ListItem key={op.id}>
                <ListItemText
                  primary={`${formatMethod(op.method)} - ${formatUrl(op.url)}`}
                  secondary={`Pendente desde: ${formatTimestamp(op.timestamp)}`}
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default SyncStatus

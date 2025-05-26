"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Snackbar, Button } from "@mui/material"
import RefreshIcon from "@mui/icons-material/Refresh"

interface PWAUpdateNotificationProps {
  onUpdate: () => void
}

const PWAUpdateNotification: React.FC<PWAUpdateNotificationProps> = ({ onUpdate }) => {
  const [showReload, setShowReload] = useState(false)
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null)

  useEffect(() => {
    // Verifica se o service worker está registrado
    if ("serviceWorker" in navigator) {
      // Adiciona um ouvinte para detectar quando uma nova versão está disponível
      window.addEventListener("sw-update-available", () => {
        setShowReload(true)
      })

      // Configura o ouvinte para o evento de atualização
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (showReload) {
          window.location.reload()
        }
      })

      // Verifica se há uma atualização disponível
      navigator.serviceWorker.ready.then((registration) => {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
                setWaitingWorker(newWorker)
                setShowReload(true)
              }
            })
          }
        })
      })
    }
  }, [showReload])

  const handleReload = () => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" })
    }
    setShowReload(false)
    onUpdate()
  }

  return (
    <Snackbar
      open={showReload}
      message="Nova versão disponível!"
      action={
        <Button color="secondary" size="small" onClick={handleReload} startIcon={<RefreshIcon />}>
          Atualizar
        </Button>
      }
    />
  )
}

export default PWAUpdateNotification

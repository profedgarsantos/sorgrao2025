"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import GetAppIcon from "@mui/icons-material/GetApp"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

const PWAInstallPrompt: React.FC = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      // Impede que o Chrome mostre o prompt padrão
      e.preventDefault()
      // Armazena o evento para que possa ser acionado mais tarde
      setInstallPrompt(e as BeforeInstallPromptEvent)
      // Mostra nosso prompt personalizado
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const handleInstall = () => {
    if (!installPrompt) {
      return
    }

    // Mostra o prompt de instalação
    installPrompt.prompt()

    // Espera pelo resultado
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("Usuário aceitou a instalação do PWA")
      } else {
        console.log("Usuário recusou a instalação do PWA")
      }
      // Limpa o prompt salvo, ele não pode ser usado duas vezes
      setInstallPrompt(null)
      setShowPrompt(false)
    })
  }

  const handleClose = () => {
    setShowPrompt(false)
  }

  return (
    <Dialog
      open={showPrompt}
      onClose={handleClose}
      aria-labelledby="pwa-install-dialog-title"
      aria-describedby="pwa-install-dialog-description"
    >
      <DialogTitle id="pwa-install-dialog-title">Instalar SorGrao</DialogTitle>
      <DialogContent>
        <DialogContentText id="pwa-install-dialog-description">
          Instale o SorGrao em seu dispositivo para acesso rápido e funcionalidades offline.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Agora não
        </Button>
        <Button onClick={handleInstall} color="primary" variant="contained" startIcon={<GetAppIcon />}>
          Instalar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default PWAInstallPrompt

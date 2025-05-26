"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Alert, Snackbar } from "@mui/material"
import WifiOffIcon from "@mui/icons-material/WifiOff"
import WifiIcon from "@mui/icons-material/Wifi"

const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showReconnected, setShowReconnected] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowReconnected(true)
      setTimeout(() => setShowReconnected(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
    }

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  return (
    <>
      {!isOnline && (
        <Alert
          severity="warning"
          icon={<WifiOffIcon />}
          sx={{
            position: "fixed",
            bottom: 0,
            width: "100%",
            zIndex: 9999,
            borderRadius: 0,
          }}
        >
          Você está offline. Algumas funcionalidades podem estar limitadas.
        </Alert>
      )}
      <Snackbar open={showReconnected} autoHideDuration={3000} onClose={() => setShowReconnected(false)}>
        <Alert severity="success" icon={<WifiIcon />} sx={{ width: "100%" }}>
          Conexão restabelecida!
        </Alert>
      </Snackbar>
    </>
  )
}

export default OfflineIndicator

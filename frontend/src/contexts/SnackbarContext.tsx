"use client"

import type React from "react"
import { createContext, useState, useCallback } from "react"
import { Snackbar, Alert, type AlertColor } from "@mui/material"

interface SnackbarContextType {
  showSnackbar: (message: string, severity?: AlertColor) => void
}

export const SnackbarContext = createContext<SnackbarContextType>({
  showSnackbar: () => {},
})

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [severity, setSeverity] = useState<AlertColor>("info")

  const showSnackbar = useCallback((message: string, severity: AlertColor = "info") => {
    setMessage(message)
    setSeverity(severity)
    setOpen(true)
  }, [])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }
    setOpen(false)
  }

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  )
}

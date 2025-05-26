"use client"

import type React from "react"

import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { CircularProgress, Box } from "@mui/material"

interface PrivateRouteProps {
  children?: React.ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export default PrivateRoute

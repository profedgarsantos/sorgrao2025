"use client"

import type React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { Container, Box, Typography, TextField, Button, Paper, Alert } from "@mui/material"
import { styled } from "@mui/material/styles"

const LoginContainer = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
}))

const LoginForm = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 400,
  width: "100%",
}))

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      await login(email, password)
      navigate("/")
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginContainer>
      <LoginForm elevation={3}>
        <Box
          sx={{
            mb: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h4" color="primary">
            SorGrao
          </Typography>
          <Typography component="h2" variant="h6">
            Sistema de Gestão de Grãos
          </Typography>
        </Box>

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </Box>
      </LoginForm>
    </LoginContainer>
  )
}

export default Login

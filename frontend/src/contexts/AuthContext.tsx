"use client"

import type React from "react"
import { createContext, useState, useEffect } from "react"
import { login as apiLogin, getProfile, logout as apiLogout } from "../api/auth"
import type { User } from "../types/user"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  error: string | null
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  loading: true,
  login: async () => {},
  logout: () => {},
  error: null,
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      if (token) {
        try {
          const userData = await getProfile()
          setUser(userData)
        } catch (err) {
          localStorage.removeItem("token")
        }
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setError(null)
      const response = await apiLogin({ email, password })
      localStorage.setItem("token", response.access_token)
      setUser(response.user)
    } catch (err: any) {
      setError(err.response?.data?.message || "Erro ao fazer login")
      throw err
    }
  }

  const logout = () => {
    apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

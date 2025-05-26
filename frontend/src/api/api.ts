import axios from "axios"
import { config } from "../config/environment"

const api = axios.create({
  baseURL: config.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor para adicionar token de autenticação
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Se o erro for 401 (não autorizado), redireciona para login
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"
    }

    // Log de erros em ambientes não-produção
    if (!isProduction()) {
      console.error("API Error:", error)
    }

    return Promise.reject(error)
  },
)

// Helper para verificar se estamos em produção
function isProduction() {
  return config.environment === "production"
}

export default api

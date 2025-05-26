import api from "./api"

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  user: {
    id: number
    name: string
    email: string
    grupos_id: number
  }
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/auth/login", credentials)
  return response.data
}

export const getProfile = async () => {
  const response = await api.get("/auth/profile")
  return response.data
}

export const logout = () => {
  localStorage.removeItem("token")
}

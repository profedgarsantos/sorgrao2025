import api from "./api"
import type { Comprador } from "../types/comprador"

export const getCompradores = async (empresaId: number) => {
  const response = await api.get<Comprador[]>(`/compradores?cidade_id=${empresaId}`)
  return response.data
}

export const getComprador = async (id: number) => {
  const response = await api.get<Comprador>(`/compradores/${id}`)
  return response.data
}

export const createComprador = async (comprador: Partial<Comprador>) => {
  const response = await api.post<Comprador>("/compradores", comprador)
  return response.data
}

export const updateComprador = async (id: number, comprador: Partial<Comprador>) => {
  const response = await api.patch<Comprador>(`/compradores/${id}`, comprador)
  return response.data
}

export const deleteComprador = async (id: number) => {
  const response = await api.delete(`/compradores/${id}`)
  return response.data
}

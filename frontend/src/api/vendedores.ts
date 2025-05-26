import api from "./api"
import type { Vendedor } from "../types/vendedor"

export const getVendedores = async (empresaId: number) => {
  const response = await api.get<Vendedor[]>(`/vendedores/empresa/${empresaId}`)
  return response.data
}

export const getVendedor = async (id: number, empresaId: number) => {
  const response = await api.get<Vendedor>(`/vendedores/${id}/empresa/${empresaId}`)
  return response.data
}

export const createVendedor = async (vendedor: Partial<Vendedor>) => {
  const response = await api.post<Vendedor>("/vendedores", vendedor)
  return response.data
}

export const updateVendedor = async (id: number, empresaId: number, vendedor: Partial<Vendedor>) => {
  const response = await api.patch<Vendedor>(`/vendedores/${id}/empresa/${empresaId}`, vendedor)
  return response.data
}

export const deleteVendedor = async (id: number, empresaId: number) => {
  const response = await api.delete(`/vendedores/${id}/empresa/${empresaId}`)
  return response.data
}

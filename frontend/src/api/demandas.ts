import api from "./api"
import type { Demanda } from "../types/demanda"

export const getDemandas = async (empresaId: number) => {
  const response = await api.get<Demanda[]>(`/demandas/empresa/${empresaId}`)
  return response.data
}

export const getDemanda = async (id: number, empresaId: number) => {
  const response = await api.get<Demanda>(`/demandas/${id}/empresa/${empresaId}`)
  return response.data
}

export const createDemanda = async (demanda: Partial<Demanda>) => {
  const response = await api.post<Demanda>("/demandas", demanda)
  return response.data
}

export const updateDemanda = async (id: number, empresaId: number, demanda: Partial<Demanda>) => {
  const response = await api.patch<Demanda>(`/demandas/${id}/empresa/${empresaId}`, demanda)
  return response.data
}

export const deleteDemanda = async (id: number, empresaId: number) => {
  const response = await api.delete(`/demandas/${id}/empresa/${empresaId}`)
  return response.data
}

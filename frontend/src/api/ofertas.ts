import api from "./api"
import type { Oferta } from "../types/oferta"

export const getOfertas = async (empresaId: number) => {
  const response = await api.get<Oferta[]>(`/ofertas/empresa/${empresaId}`)
  return response.data
}

export const getOferta = async (id: number, empresaId: number) => {
  const response = await api.get<Oferta>(`/ofertas/${id}/empresa/${empresaId}`)
  return response.data
}

export const createOferta = async (oferta: Partial<Oferta>) => {
  const response = await api.post<Oferta>("/ofertas", oferta)
  return response.data
}

export const updateOferta = async (id: number, empresaId: number, oferta: Partial<Oferta>) => {
  const response = await api.patch<Oferta>(`/ofertas/${id}/empresa/${empresaId}`, oferta)
  return response.data
}

export const deleteOferta = async (id: number, empresaId: number) => {
  const response = await api.delete(`/ofertas/${id}/empresa/${empresaId}`)
  return response.data
}

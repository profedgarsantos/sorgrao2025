import api from "./api"
import type { Produto } from "../types/produto"

export const getProdutos = async (empresaId: number) => {
  const response = await api.get<Produto[]>(`/produtos/empresa/${empresaId}`)
  return response.data
}

export const getProduto = async (id: number) => {
  const response = await api.get<Produto>(`/produtos/${id}`)
  return response.data
}

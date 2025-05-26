import api from "./api"
import type { Funrural } from "../types/funrural"

export const getFunrurais = async (empresaId: number) => {
  const response = await api.get<Funrural[]>(`/funrurais/empresa/${empresaId}`)
  return response.data
}

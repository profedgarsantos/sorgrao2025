import api from "./api"

export interface CalculoFunruralParams {
  valor: number
  funruralId?: number
}

export interface CalculoFreteParams {
  distancia: number
  peso: number
  tipoFreteId: number
}

export interface CalculoComissaoParams {
  valor: number
  percentual: number
}

export interface CalculoOfertaCompletaParams {
  ofertaId: number
  comissionadoId: number
  distancia: number
  percentualComissao: number
}

export interface ResultadoCalculo {
  valorFunrural: number
  valorFrete: number
  valorComissao: number
  valorFinal: number
}

export const calcularFunrural = async (params: CalculoFunruralParams) => {
  const response = await api.post("/calculadora/funrural", params)
  return response.data
}

export const calcularFrete = async (params: CalculoFreteParams) => {
  const response = await api.post("/calculadora/frete", params)
  return response.data
}

export const calcularComissao = async (params: CalculoComissaoParams) => {
  const response = await api.post("/calculadora/comissao", params)
  return response.data
}

export const calcularOfertaCompleta = async (params: CalculoOfertaCompletaParams) => {
  const response = await api.post<ResultadoCalculo>("/calculadora/oferta-completa", params)
  return response.data
}

export const getHistoricoCalculos = async (ofertaId: number) => {
  const response = await api.get(`/calculadora/historico/oferta/${ofertaId}`)
  return response.data
}

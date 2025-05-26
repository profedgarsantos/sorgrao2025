import type { Comprador } from "./comprador"
import type { Produto } from "./produto"

export interface Demanda {
  id: number
  quantidade: number
  valorunitario: number
  validade: string
  finalizado: boolean
  capacidaderecepcao: number
  cancelado: boolean
  produtos_id: number
  compradores_id: number
  empresas_id: number
  created_at: string
  updated_at: string
  comprador?: Comprador
  produto?: Produto
}

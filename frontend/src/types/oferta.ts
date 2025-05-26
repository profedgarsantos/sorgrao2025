import type { Vendedor } from "./vendedor"
import type { Produto } from "./produto"

export interface Oferta {
  id: number
  quantidade: number
  valorunitario: number
  valorunitariorevenda: number
  validade: string
  distanciavendedor: number
  cancelado: boolean
  tipoentrega: string
  capacidadeexpedicao: number
  vendedores_id: number
  empresas_id: number
  produtos_id: number
  created_at: string
  updated_at: string
  vendedor?: Vendedor
  produto?: Produto
}

import type { User } from "./user"
import type { Funrural } from "./funrural"

export interface Vendedor {
  id: number
  nomebanco: string
  numerobanco: number
  agencia: string
  contacorrente: string
  usuario_id: number
  funrural_id: number
  empresas_id: number
  user?: User
  funrural?: Funrural
}

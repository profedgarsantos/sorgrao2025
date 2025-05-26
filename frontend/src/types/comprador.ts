import type { User } from "./user"

export interface Comprador {
  id: number
  empresas_id: number
  usuario_id: number
  user?: User
}

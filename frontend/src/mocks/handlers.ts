import { rest } from "msw"
import { config } from "../config/environment"

export const handlers = [
  rest.get(`${config.apiUrl}/produtos`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, nome: "Soja", unidade: "Saca", preco: 150.0 },
        { id: 2, nome: "Milho", unidade: "Saca", preco: 80.0 },
      ]),
    )
  }),

  rest.get(`${config.apiUrl}/vendedores`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, nome: "João Silva", email: "joao@exemplo.com" },
        { id: 2, nome: "Maria Oliveira", email: "maria@exemplo.com" },
      ]),
    )
  }),

  // Adicione mais handlers conforme necessário
]

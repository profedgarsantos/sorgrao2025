import { Injectable } from "@nestjs/common"
import { CalcularFunruralDto } from "../dto/calcular-funrural.dto"
import { FunruraisService } from "../../funrurais/funrurais.service" // Changed from type-only import

@Injectable()
export class FunruralService {
  constructor(private funruraisService: FunruraisService) {}

  async calcularFunrural(calcularFunruralDto: CalcularFunruralDto) {
    const { valor, funrural_id } = calcularFunruralDto

    // Se foi fornecido um ID de funrural, busca a taxa no banco
    let taxaPercentual = 1.5 // Taxa padrão

    if (funrural_id) {
      const funrural = await this.funruraisService.findOne(funrural_id)
      taxaPercentual = Number(funrural.valor)
    }

    const taxaDecimal = taxaPercentual / 100
    const valorFunrural = valor * taxaDecimal

    return {
      valor_original: valor,
      taxa_percentual: taxaPercentual,
      valor_funrural: valorFunrural,
      valor_liquido: valor - valorFunrural,
    }
  }
}

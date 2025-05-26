import { Injectable } from "@nestjs/common"
import { CalcularComissaoDto } from "../dto/calcular-comissao.dto"

@Injectable()
export class ComissaoService {
  calcularComissao(calcularComissaoDto: CalcularComissaoDto) {
    const { valor_operacao, percentual_comissao } = calcularComissaoDto

    const taxaDecimal = percentual_comissao / 100
    const valorComissao = valor_operacao * taxaDecimal

    return {
      valor_operacao,
      percentual_comissao,
      valor_comissao: valorComissao,
    }
  }
}

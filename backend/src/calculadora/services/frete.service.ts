import { Injectable } from "@nestjs/common"
import { CalcularFreteDto } from "../dto/calcular-frete.dto"
import { FretesService } from "../../fretes/fretes.service" // Changed from type-only import

@Injectable()
export class FreteService {
  constructor(private fretesService: FretesService) {}

  async calcularFrete(calcularFreteDto: CalcularFreteDto) {
    const { distancia, valor_por_km, peso, valor_por_tonelada } = calcularFreteDto

    // Verificar se existe uma tabela de frete para esta distância
    const tabelaFrete = await this.fretesService.findByDistancia(distancia)

    let valorPorKm = valor_por_km

    // Se encontrou uma tabela de frete, usa o valor dela
    if (tabelaFrete) {
      valorPorKm = Number(tabelaFrete.valorfrete)
    }

    // Cálculo baseado na distância
    const valorDistancia = distancia * valorPorKm

    // Cálculo baseado no peso (toneladas)
    const valorPeso = (peso / 1000) * valor_por_tonelada

    // Valor total do frete
    const valorTotal = valorDistancia + valorPeso

    return {
      distancia,
      valor_por_km: valorPorKm,
      peso,
      valor_por_tonelada,
      valor_distancia: valorDistancia,
      valor_peso: valorPeso,
      valor_total: valorTotal,
      tabela_frete_id: tabelaFrete?.id,
    }
  }
}

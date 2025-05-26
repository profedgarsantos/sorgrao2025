import { Injectable } from "@nestjs/common"
import { Repository } from "typeorm" // Repository can often be a type-only import if not used in a way that requires its runtime value directly in the constructor signature for DI token.
import { Calculadora } from "./entities/calculadora.entity"
import { FunruralService } from "./services/funrural.service" // Changed
import { FreteService } from "./services/frete.service" // Changed
import { ComissaoService } from "./services/comissao.service" // Changed
import { CalcularOfertaCompletaDto } from "./dto/calcular-oferta-completa.dto"
import { OfertasService } from "../ofertas/ofertas.service" // Changed
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class CalculadoraService {


  constructor(
    @InjectRepository(Calculadora)
    private readonly calculadoraRepository: Repository<Calculadora>,
    private funruralService: FunruralService,
    private freteService: FreteService,
    private comissaoService: ComissaoService,
    private ofertasService: OfertasService,
  ) {}

  async calcularOfertaCompleta(calcularOfertaCompletaDto: CalcularOfertaCompletaDto) {
    const { oferta_id, comissionado_id, distancia, valor_por_km, peso, valor_por_tonelada } = calcularOfertaCompletaDto

    // Buscar a oferta
    const oferta = await this.ofertasService.findOne(oferta_id)

    // Buscar o vendedor e seu funrural
    const vendedor = oferta.vendedor

    // Calcular frete
    const calculoFrete = await this.freteService.calcularFrete({
      distancia,
      valor_por_km,
      peso,
      valor_por_tonelada,
    })

    // Calcular funrural
    const calculoFunrural = await this.funruralService.calcularFunrural({
      valor: oferta.valorunitario * oferta.quantidade,
      funrural_id: vendedor.funrural_id,
    })

    // Calcular comissão
    const calculoComissao = await this.comissaoService.calcularComissao({
      valor_operacao: oferta.valorunitario * oferta.quantidade,
      percentual_comissao: calcularOfertaCompletaDto.percentual_comissao || 0.5,
    })

    // Calcular valor final
    const valorFinal =
      oferta.valorunitario * oferta.quantidade -
      calculoFunrural.valor_funrural -
      calculoFrete.valor_total -
      calculoComissao.valor_comissao

    // Salvar o cálculo no histórico
    const calculadora = this.calculadoraRepository.create({
      comissionados_id: comissionado_id,
      valorfrete: calculoFrete.valor_total,
      valorcomissionado: calculoComissao.valor_comissao,
      valoroferta: oferta.valorunitario * oferta.quantidade,
      valorfunrural: calculoFunrural.valor_funrural,
      valorfinal: valorFinal,
      ofertas_id: oferta_id,
    })

    await this.calculadoraRepository.save(calculadora)

    // Retornar o resultado completo
    return {
      oferta: {
        id: oferta.id,
        produto: oferta.produto.nome,
        quantidade: oferta.quantidade,
        valor_unitario: oferta.valorunitario,
        valor_total: oferta.valorunitario * oferta.quantidade,
      },
      frete: calculoFrete,
      funrural: calculoFunrural,
      comissao: calculoComissao,
      valor_final: valorFinal,
      calculo_id: calculadora.id,
    }
  }

  async getHistoricoOferta(ofertaId: number) {
    return this.calculadoraRepository.find({
      where: { ofertas_id: ofertaId },
      order: { created_at: "DESC" },
    })
  }
}

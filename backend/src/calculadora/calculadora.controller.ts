import { Controller, UseGuards } from "@nestjs/common/decorators/core"
import { Body, Get, Param, Post } from "@nestjs/common/decorators/http"


import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { CalculadoraService } from "./calculadora.service"
import { FunruralService } from "./services/funrural.service"
import { FreteService } from "./services/frete.service"
import { ComissaoService } from "./services/comissao.service"
import { CalcularFunruralDto } from "./dto/calcular-funrural.dto"
import { CalcularFreteDto } from "./dto/calcular-frete.dto"
import { CalcularComissaoDto } from "./dto/calcular-comissao.dto"
import { CalcularOfertaCompletaDto } from "./dto/calcular-oferta-completa.dto"


@ApiTags("calculadora")
@Controller("calculadora")
export class CalculadoraController {
  constructor(
    private readonly calculadoraService: CalculadoraService,
    private readonly funruralService: FunruralService,
    private readonly freteService: FreteService,
    private readonly comissaoService: ComissaoService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post("funrural")
  @ApiOperation({ summary: "Calcular valor do Funrural" })
  @ApiResponse({ status: 200, description: "Cálculo realizado com sucesso" })
  @ApiBearerAuth()
  calcularFunrural(@Body() calcularFunruralDto: CalcularFunruralDto) {
    return this.funruralService.calcularFunrural(calcularFunruralDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post("frete")
  @ApiOperation({ summary: "Calcular valor do frete" })
  @ApiResponse({ status: 200, description: "Cálculo realizado com sucesso" })
  @ApiBearerAuth()
  calcularFrete(@Body() calcularFreteDto: CalcularFreteDto) {
    return this.freteService.calcularFrete(calcularFreteDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post("comissao")
  @ApiOperation({ summary: "Calcular valor da comissão" })
  @ApiResponse({ status: 200, description: "Cálculo realizado com sucesso" })
  @ApiBearerAuth()
  calcularComissao(@Body() calcularComissaoDto: CalcularComissaoDto) {
    return this.comissaoService.calcularComissao(calcularComissaoDto)
  }

  @UseGuards(JwtAuthGuard)
  @Post("oferta-completa")
  @ApiOperation({ summary: "Calcular todos os valores para uma oferta" })
  @ApiResponse({ status: 200, description: "Cálculo realizado com sucesso" })
  @ApiBearerAuth()
  calcularOfertaCompleta(@Body() calcularOfertaCompletaDto: CalcularOfertaCompletaDto) {
    return this.calculadoraService.calcularOfertaCompleta(calcularOfertaCompletaDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get("historico/oferta/:id")
  @ApiOperation({ summary: "Obter histórico de cálculos para uma oferta" })
  @ApiResponse({ status: 200, description: "Histórico obtido com sucesso" })
  @ApiBearerAuth()
  getHistoricoOferta(@Param("id") id: string) {
    return this.calculadoraService.getHistoricoOferta(+id)
  }
}

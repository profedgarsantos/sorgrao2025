import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CalculadoraController } from "./calculadora.controller"
import { CalculadoraService } from "./calculadora.service"
import { FunruralService } from "./services/funrural.service"
import { FreteService } from "./services/frete.service"
import { ComissaoService } from "./services/comissao.service"
import { Calculadora } from "./entities/calculadora.entity"
import { FretesModule } from "../fretes/fretes.module"
import { FunruraisModule } from "../funrurais/funrurais.module"
import { ComissionadosModule } from "../comissionados/comissionados.module"
import { VendedoresModule } from "../vendedores/vendedores.module"
import { OfertasModule } from "../ofertas/ofertas.module"

@Module({
  imports: [
    TypeOrmModule.forFeature([Calculadora]),
    FretesModule,
    FunruraisModule,
    ComissionadosModule,
    VendedoresModule,
    OfertasModule,
  ],
  controllers: [CalculadoraController],
  providers: [CalculadoraService, FunruralService, FreteService, ComissaoService],
  exports: [CalculadoraService, FunruralService, FreteService, ComissaoService],
})
export class CalculadoraModule {}

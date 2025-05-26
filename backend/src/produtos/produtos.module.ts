import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ProdutosController } from "./produtos.controller"
import { ProdutosService } from "./produtos.service"
import { Produto } from "./entities/produto.entity"
import { TipoFrete } from "./entities/tipo-frete.entity"
// Corrected paths for TiposFreteController and TiposFreteService
import { TiposFretesController } from "../fretes/controllers/tipos-fretes.controller" // Corrected: TiposFreteController to TiposFretesController and path
import { TiposFretesService } from "../fretes/services/tipos-fretes.service" // Corrected: TiposFreteService to TiposFretesService and path

@Module({
  imports: [TypeOrmModule.forFeature([Produto, TipoFrete])],
  controllers: [ProdutosController, TiposFretesController], // Corrected: TiposFreteController to TiposFretesController
  providers: [ProdutosService, TiposFretesService], // Corrected: TiposFreteService to TiposFretesService
  exports: [ProdutosService, TiposFretesService], // Corrected: TiposFreteService to TiposFretesService
})
export class ProdutosModule {}

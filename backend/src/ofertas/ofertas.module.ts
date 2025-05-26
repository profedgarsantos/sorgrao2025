import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { OfertasController } from "./ofertas.controller"
import { OfertasService } from "./ofertas.service"
import { Oferta } from "./entities/oferta.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Oferta])],
  controllers: [OfertasController],
  providers: [OfertasService],
  exports: [OfertasService],
})
export class OfertasModule {}

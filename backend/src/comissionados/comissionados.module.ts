import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { ComissionadosController } from "./comissionados.controller"
import { ComissionadosService } from "./comissionados.service"
import { Comissionado } from "./entities/comissionado.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Comissionado])],
  controllers: [ComissionadosController],
  providers: [ComissionadosService],
  exports: [ComissionadosService],
})
export class ComissionadosModule {}

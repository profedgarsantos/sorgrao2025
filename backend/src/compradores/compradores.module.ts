import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { CompradoresController } from "./compradores.controller"
import { CompradoresService } from "./compradores.service"
import { Comprador } from "./entities/comprador.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Comprador])],
  controllers: [CompradoresController],
  providers: [CompradoresService],
  exports: [CompradoresService],
})
export class CompradoresModule {}

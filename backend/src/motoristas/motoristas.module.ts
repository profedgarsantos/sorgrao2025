import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { MotoristasController } from "./motoristas.controller"
import { MotoristasService } from "./motoristas.service"
import { Motorista } from "./entities/motorista.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Motorista])],
  controllers: [MotoristasController],
  providers: [MotoristasService],
  exports: [MotoristasService],
})
export class MotoristasModule {}

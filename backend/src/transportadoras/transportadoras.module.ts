import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { TransportadorasController } from "./transportadoras.controller"
import { TransportadorasService } from "./transportadoras.service"
import { Transportadora } from "./entities/transportadora.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Transportadora])],
  controllers: [TransportadorasController],
  providers: [TransportadorasService],
  exports: [TransportadorasService],
})
export class TransportadorasModule {}

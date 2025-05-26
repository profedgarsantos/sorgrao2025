import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Demanda } from "./entities/demanda.entity"
import { AuthModule } from "../auth/auth.module"
import { DemandasController } from "./demandas.controller"
import { DemandasService } from "./demandas.service"

@Module({
  imports: [TypeOrmModule.forFeature([Demanda]), AuthModule],
  controllers: [DemandasController],
  providers: [DemandasService],
  exports: [DemandasService],
})
export class DemandasModule {}

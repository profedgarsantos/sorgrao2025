import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { FechamentosController } from "./fechamentos.controller"
import { FechamentosService } from "./fechamentos.service"
import { Fechamento } from "./entities/fechamento.entity"
import { AuthModule } from "../auth/auth.module"

@Module({
  imports: [TypeOrmModule.forFeature([Fechamento]), AuthModule],
  controllers: [FechamentosController],
  providers: [FechamentosService],
  exports: [FechamentosService],
})
export class FechamentosModule {}

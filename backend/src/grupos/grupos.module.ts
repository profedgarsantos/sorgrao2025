import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { Grupo } from "src/users/entities/grupo.entity"
import { GruposService } from "./grupos.service"
import { GruposController } from "./grupos.controller"


@Module({
  imports: [TypeOrmModule.forFeature([Grupo])],
  controllers: [GruposController],
  providers: [GruposService],
  exports: [GruposService],
})
export class GruposModule {}

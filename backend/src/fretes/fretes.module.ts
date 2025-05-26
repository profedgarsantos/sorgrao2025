import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { FretesController } from "./fretes.controller"
import { FretesService } from "./fretes.service"
import { Frete } from "./entities/frete.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Frete])],
  controllers: [FretesController],
  providers: [FretesService],
  exports: [FretesService],
})
export class FretesModule {}

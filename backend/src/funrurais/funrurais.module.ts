import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { FunruraisController } from "./funrurais.controller"
import { FunruraisService } from "./funrurais.service"
import { Funrural } from "./entities/funrural.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Funrural])],
  controllers: [FunruraisController],
  providers: [FunruraisService],
  exports: [FunruraisService],
})
export class FunruraisModule {}

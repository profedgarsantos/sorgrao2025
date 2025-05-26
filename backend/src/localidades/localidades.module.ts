import { Module } from "@nestjs/common"
import { TypeOrmModule } from "@nestjs/typeorm"
import { PaisesController } from "./controllers/paises.controller"
import { EstadosController } from "./controllers/estados.controller"
import { CidadesController } from "./controllers/cidades.controller"
import { PaisesService } from "./services/paises.service"
import { EstadosService } from "./services/estados.service"
import { CidadesService } from "./services/cidades.service"
import { Pais } from "./entities/pais.entity"
import { Estado } from "./entities/estado.entity"
import { Cidade } from "./entities/cidade.entity"

@Module({
  imports: [TypeOrmModule.forFeature([Pais, Estado, Cidade])],
  controllers: [PaisesController, EstadosController, CidadesController],
  providers: [PaisesService, EstadosService, CidadesService],
  exports: [PaisesService, EstadosService, CidadesService],
})
export class LocalidadesModule {}

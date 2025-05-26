import { PartialType } from "@nestjs/swagger"
import { CreateTipoFreteDto } from "./create-tipo-frete.dto"

export class UpdateTipoFreteDto extends PartialType(CreateTipoFreteDto) {}

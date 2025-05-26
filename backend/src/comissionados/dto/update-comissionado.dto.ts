import { PartialType } from "@nestjs/swagger"
import { CreateComissionadoDto } from "./create-comissionado.dto"

export class UpdateComissionadoDto extends PartialType(CreateComissionadoDto) {}

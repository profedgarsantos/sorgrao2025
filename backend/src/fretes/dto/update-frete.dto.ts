import { PartialType } from "@nestjs/swagger"
import { CreateFreteDto } from "./create-frete.dto"

export class UpdateFreteDto extends PartialType(CreateFreteDto) {}

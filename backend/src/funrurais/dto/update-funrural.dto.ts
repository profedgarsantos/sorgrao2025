import { PartialType } from "@nestjs/swagger"
import { CreateFunruralDto } from "./create-funrural.dto"

export class UpdateFunruralDto extends PartialType(CreateFunruralDto) {}

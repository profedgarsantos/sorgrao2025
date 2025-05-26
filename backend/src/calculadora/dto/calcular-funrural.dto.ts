import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator"

export class CalcularFunruralDto {
  @ApiProperty({ example: 10000 })
  @IsNotEmpty({ message: "Valor é obrigatório" })
  @IsNumber({}, { message: "Valor deve ser um número" })
  @Min(0, { message: "Valor deve ser maior ou igual a zero" })
  valor: number

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: "ID do funrural deve ser um número" })
  funrural_id?: number
}

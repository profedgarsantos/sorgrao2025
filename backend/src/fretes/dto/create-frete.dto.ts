import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator"

export class CreateFreteDto {
  @ApiProperty({ example: 0 })
  @IsNotEmpty({ message: "Distância inicial é obrigatória" })
  @IsNumber({}, { message: "Distância inicial deve ser um número" })
  @Min(0, { message: "Distância inicial deve ser maior ou igual a zero" })
  distanciainicial: number

  @ApiProperty({ example: 100, required: false })
  @IsOptional()
  @IsNumber({}, { message: "Distância final deve ser um número" })
  @Min(0, { message: "Distância final deve ser maior ou igual a zero" })
  distanciafinal?: number

  @ApiProperty({ example: 5.5 })
  @IsNotEmpty({ message: "Valor do frete é obrigatório" })
  @IsNumber({}, { message: "Valor do frete deve ser um número" })
  @Min(0, { message: "Valor do frete deve ser maior ou igual a zero" })
  valorfrete: number

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "Tipo de frete é obrigatório" })
  @IsNumber({}, { message: "Tipo de frete deve ser um número" })
  tiposfretes_id: number
}

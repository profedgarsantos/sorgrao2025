import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, Min } from "class-validator"

export class CalcularFreteDto {
  @ApiProperty({ example: 100 })
  @IsNotEmpty({ message: "Distância é obrigatória" })
  @IsNumber({}, { message: "Distância deve ser um número" })
  @Min(0, { message: "Distância deve ser maior ou igual a zero" })
  distancia: number

  @ApiProperty({ example: 5.5 })
  @IsNotEmpty({ message: "Valor por km é obrigatório" })
  @IsNumber({}, { message: "Valor por km deve ser um número" })
  @Min(0, { message: "Valor por km deve ser maior ou igual a zero" })
  valor_por_km: number

  @ApiProperty({ example: 30000 })
  @IsNotEmpty({ message: "Peso é obrigatório" })
  @IsNumber({}, { message: "Peso deve ser um número" })
  @Min(0, { message: "Peso deve ser maior ou igual a zero" })
  peso: number

  @ApiProperty({ example: 100 })
  @IsNotEmpty({ message: "Valor por tonelada é obrigatório" })
  @IsNumber({}, { message: "Valor por tonelada deve ser um número" })
  @Min(0, { message: "Valor por tonelada deve ser maior ou igual a zero" })
  valor_por_tonelada: number
}

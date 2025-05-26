import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, Min, Max } from "class-validator"

export class CreateFunruralDto {
  @ApiProperty({ example: "Funrural Padrão" })
  @IsNotEmpty({ message: "Descrição é obrigatória" })
  @IsString({ message: "Descrição deve ser uma string" })
  descricao: string

  @ApiProperty({ example: 1.5 })
  @IsNotEmpty({ message: "Valor é obrigatório" })
  @IsNumber({}, { message: "Valor deve ser um número" })
  @Min(0, { message: "Valor deve ser maior ou igual a zero" })
  @Max(100, { message: "Valor deve ser menor ou igual a 100" })
  valor: number
}

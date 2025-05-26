import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator"

export class CreateCidadeDto {
  @ApiProperty({ example: "São Paulo" })
  @IsNotEmpty({ message: "Nome é obrigatório" })
  @IsString({ message: "Nome deve ser uma string" })
  nome: string

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "ID do estado é obrigatório" })
  @IsNumber({}, { message: "ID do estado deve ser um número" })
  estado_id: number

  @ApiProperty({ example: "3550308", required: false })
  @IsOptional()
  @IsString({ message: "Código IBGE deve ser uma string" })
  codigo_ibge?: string
}

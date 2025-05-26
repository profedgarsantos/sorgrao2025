import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator"

export class CreateVeiculoDto {
  @ApiProperty({ example: "ABC-1234" })
  @IsNotEmpty({ message: "Placa é obrigatória" })
  @IsString({ message: "Placa deve ser uma string" })
  placa: string

  @ApiProperty({ example: "Volvo FH 540", required: false })
  @IsOptional()
  @IsString({ message: "Modelo deve ser uma string" })
  modelo?: string

  @ApiProperty({ example: "Carreta", required: false })
  @IsOptional()
  @IsString({ message: "Tipo deve ser uma string" })
  tipo?: string

  @ApiProperty({ example: 30000, required: false })
  @IsOptional()
  @IsNumber({}, { message: "Capacidade deve ser um número" })
  capacidade?: number

  @ApiProperty({ example: 2020, required: false })
  @IsOptional()
  @IsNumber({}, { message: "Ano deve ser um número" })
  ano?: number

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: "ID da transportadora deve ser um número" })
  transportadora_id?: number
}

import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsBoolean, IsDate } from "class-validator"
import { Type } from "class-transformer"

export class CreateOfertaDto {
  @ApiProperty({ example: 1000 })
  @IsNumber({}, { message: "Quantidade deve ser um número" })
  @IsNotEmpty({ message: "Quantidade é obrigatória" })
  quantidade: number

  @ApiProperty({ example: 100.5 })
  @IsNumber({}, { message: "Valor unitário deve ser um número" })
  @IsNotEmpty({ message: "Valor unitário é obrigatório" })
  valorunitario: number

  @ApiProperty({ example: 110.5, required: false })
  @IsOptional()
  @IsNumber({}, { message: "Valor unitário de revenda deve ser um número" })
  valorunitariorevenda?: number

  @ApiProperty({ example: "2023-12-31" })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: "Validade é obrigatória" })
  validade: Date

  @ApiProperty({ example: 100, required: false })
  @IsOptional()
  @IsNumber({}, { message: "Distância do vendedor deve ser um número" })
  distanciavendedor?: number

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  cancelado?: boolean

  @ApiProperty({ example: "CIF", required: false })
  @IsOptional()
  @IsString()
  tipoentrega?: string

  @ApiProperty({ example: 500, required: false })
  @IsOptional()
  @IsNumber({}, { message: "Capacidade de expedição deve ser um número" })
  capacidadeexpedicao?: number

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: "ID do vendedor deve ser um número" })
  @IsNotEmpty({ message: "ID do vendedor é obrigatório" })
  vendedores_id: number

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: "ID da empresa deve ser um número" })
  @IsNotEmpty({ message: "ID da empresa é obrigatório" })
  empresas_id: number

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: "ID do produto deve ser um número" })
  @IsNotEmpty({ message: "ID do produto é obrigatório" })
  produtos_id: number
}

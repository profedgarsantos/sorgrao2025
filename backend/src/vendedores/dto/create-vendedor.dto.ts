import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateVendedorDto {
  @ApiProperty({ example: "Banco do Brasil", required: false })
  @IsOptional()
  @IsString()
  nomebanco?: string

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: "Número do banco deve ser um número" })
  numerobanco?: number

  @ApiProperty({ example: "1234", required: false })
  @IsOptional()
  @IsString()
  agencia?: string

  @ApiProperty({ example: "12345-6", required: false })
  @IsOptional()
  @IsString()
  contacorrente?: string

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: "ID do usuário deve ser um número" })
  @IsNotEmpty({ message: "ID do usuário é obrigatório" })
  usuario_id: number

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: "ID do funrural deve ser um número" })
  @IsNotEmpty({ message: "ID do funrural é obrigatório" })
  funrural_id: number

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: "ID da empresa deve ser um número" })
  @IsNotEmpty({ message: "ID da empresa é obrigatório" })
  empresas_id: number
}

import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsEmail, IsOptional, IsNumber } from "class-validator"

export class CreateEmpresaDto {
  @ApiProperty({ example: "SorGrao Ltda" })
  @IsNotEmpty({ message: "Nome é obrigatório" })
  nome: string

  @ApiProperty({ example: "contato@sorgrao.com.br" })
  @IsEmail({}, { message: "Email inválido" })
  @IsNotEmpty({ message: "Email é obrigatório" })
  email: string

  @ApiProperty({ example: "Av. Paulista", required: false })
  @IsOptional()
  logradouro?: string

  @ApiProperty({ example: "1000", required: false })
  @IsOptional()
  numero?: string

  @ApiProperty({ example: "(11) 3333-4444", required: false })
  @IsOptional()
  telefone?: string

  @ApiProperty({ example: "(11) 99999-8888", required: false })
  @IsOptional()
  celular?: string

  @ApiProperty({ example: 1 })
  @IsNumber({}, { message: "ID da cidade deve ser um número" })
  @IsNotEmpty({ message: "ID da cidade é obrigatório" })
  cidades_id: number
}

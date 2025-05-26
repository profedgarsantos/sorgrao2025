import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsOptional, IsEmail, IsNumber } from "class-validator"

export class CreateCompradorDto {
  @ApiProperty({ example: "Comprador ABC" })
  @IsNotEmpty({ message: "Nome é obrigatório" })
  @IsString({ message: "Nome deve ser uma string" })
  nome: string

  @ApiProperty({ example: "Comprador ABC Ltda", required: false })
  @IsOptional()
  @IsString({ message: "Razão social deve ser uma string" })
  razao_social?: string

  @ApiProperty({ example: "12.345.678/0001-90", required: false })
  @IsOptional()
  @IsString({ message: "CPF/CNPJ deve ser uma string" })
  cpf_cnpj?: string

  @ApiProperty({ example: "123456789", required: false })
  @IsOptional()
  @IsString({ message: "Inscrição estadual deve ser uma string" })
  inscricao_estadual?: string

  @ApiProperty({ example: "(11) 99999-9999", required: false })
  @IsOptional()
  @IsString({ message: "Telefone deve ser uma string" })
  telefone?: string

  @ApiProperty({ example: "contato@comprador.com", required: false })
  @IsOptional()
  @IsEmail({}, { message: "Email inválido" })
  email?: string

  @ApiProperty({ example: "Rua Exemplo, 123", required: false })
  @IsOptional()
  @IsString({ message: "Endereço deve ser uma string" })
  endereco?: string

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: "ID da cidade deve ser um número" })
  cidade_id?: number
}

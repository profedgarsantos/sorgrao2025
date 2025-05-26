import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator"

export class CreateMotoristaDto {
  @ApiProperty({ example: "João Silva" })
  @IsNotEmpty({ message: "Nome é obrigatório" })
  @IsString({ message: "Nome deve ser uma string" })
  nome: string

  @ApiProperty({ example: "123.456.789-00", required: false })
  @IsOptional()
  @IsString({ message: "CPF deve ser uma string" })
  cpf?: string

  @ApiProperty({ example: "12345678900", required: false })
  @IsOptional()
  @IsString({ message: "CNH deve ser uma string" })
  cnh?: string

  @ApiProperty({ example: "(11) 99999-9999", required: false })
  @IsOptional()
  @IsString({ message: "Telefone deve ser uma string" })
  telefone?: string

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  @IsNumber({}, { message: "ID da transportadora deve ser um número" })
  transportadora_id?: number
}

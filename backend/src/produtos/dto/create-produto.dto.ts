import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsOptional, IsNumber, Min } from "class-validator"

export class CreateProdutoDto {
  @ApiProperty({ example: "Soja" })
  @IsNotEmpty({ message: "Nome é obrigatório" })
  @IsString({ message: "Nome deve ser uma string" })
  nome: string

  @ApiProperty({ example: "Soja em grãos", required: false })
  @IsOptional()
  @IsString({ message: "Descrição deve ser uma string" })
  descricao?: string

  @ApiProperty({ example: "Grão", required: false })
  @IsOptional()
  @IsString({ message: "Tipo deve ser uma string" })
  tipo?: string

  @ApiProperty({ example: "kg", required: false })
  @IsOptional()
  @IsString({ message: "Unidade deve ser uma string" })
  unidade?: string

  @ApiProperty({ example: 100.5, required: false })
  @IsOptional()
  @IsNumber({}, { message: "Preço deve ser um número" })
  @Min(0, { message: "Preço deve ser maior ou igual a zero" })
  preco?: number
}

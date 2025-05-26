import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsNumber, Length } from "class-validator"

export class CreateEstadoDto {
  @ApiProperty({ example: "São Paulo" })
  @IsNotEmpty({ message: "Nome é obrigatório" })
  @IsString({ message: "Nome deve ser uma string" })
  nome: string

  @ApiProperty({ example: "SP" })
  @IsNotEmpty({ message: "UF é obrigatória" })
  @IsString({ message: "UF deve ser uma string" })
  @Length(2, 2, { message: "UF deve ter exatamente 2 caracteres" })
  uf: string

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "ID do país é obrigatório" })
  @IsNumber({}, { message: "ID do país deve ser um número" })
  pais_id: number
}

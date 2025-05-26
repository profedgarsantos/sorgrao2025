import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, IsOptional } from "class-validator"

export class CreateTipoFreteDto {
  @ApiProperty({ example: "Frete CIF" })
  @IsNotEmpty({ message: "Nome é obrigatório" })
  @IsString({ message: "Nome deve ser uma string" })
  nome: string

  @ApiProperty({ example: "Frete por conta do remetente", required: false })
  @IsOptional()
  @IsString({ message: "Descrição deve ser uma string" })
  descricao?: string
}

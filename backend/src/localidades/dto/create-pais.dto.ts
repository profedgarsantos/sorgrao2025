import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, Length } from "class-validator"

export class CreatePaisDto {
  @ApiProperty({ example: "Brasil" })
  @IsNotEmpty({ message: "Nome é obrigatório" })
  @IsString({ message: "Nome deve ser uma string" })
  nome: string

  @ApiProperty({ example: "BR" })
  @IsNotEmpty({ message: "Sigla é obrigatória" })
  @IsString({ message: "Sigla deve ser uma string" })
  @Length(2, 2, { message: "Sigla deve ter exatamente 2 caracteres" })
  sigla: string
}

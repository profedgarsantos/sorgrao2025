import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString} from "class-validator"

export class CreateGrupoDto {
  @ApiProperty({ example: "Grupo ABC" })
  @IsNotEmpty({ message: "Nome é obrigatório" })
  @IsString({ message: "Nome deve ser uma string" })
  nome: string
}

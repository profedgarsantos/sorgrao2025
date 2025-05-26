import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber } from "class-validator"

export class BuscaPorUsuarioDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: "ID do usuário é obrigatório" })
  @IsNumber({}, { message: "ID do usuário deve ser um número" })
  usuario_id: number
}

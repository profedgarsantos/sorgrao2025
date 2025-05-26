import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class LoginDto {
  @ApiProperty({ example: "usuario@exemplo.com" })
  @IsEmail({}, { message: "Email inválido" })
  @IsNotEmpty({ message: "Email é obrigatório" })
  email: string

  @ApiProperty({ example: "senha123" })
  @IsNotEmpty({ message: "Senha é obrigatória" })
  @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres" })
  password: string
}

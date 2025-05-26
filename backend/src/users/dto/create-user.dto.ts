import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsNumber } from "class-validator"

export class CreateUserDto {
  @ApiProperty({ example: "João Silva" })
  @IsNotEmpty({ message: "Nome é obrigatório" })
  name: string

  @ApiProperty({ example: "usuario@exemplo.com" })
  @IsEmail({}, { message: "Email inválido" })
  @IsNotEmpty({ message: "Email é obrigatório" })
  email: string

  @ApiProperty({ example: "senha123" })
  @IsNotEmpty({ message: "Senha é obrigatória" })
  @MinLength(6, { message: "A senha deve ter pelo menos 6 caracteres" })
  password: string

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsNumber({}, { message: "Grupo ID deve ser um número" })
  grupo_id?: number
}

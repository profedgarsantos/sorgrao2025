import { Injectable, BadRequestException } from "@nestjs/common"
import { JwtService } from "@nestjs/jwt" // Changed from type-only import
import { UsersService } from "../users/users.service" // Changed from type-only import
import { RegisterDto } from "./dto/register.dto" // DTO can remain type-only if not used for DI
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email)
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, name: user.name, grupo_id: user.grupo_id }
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        grupo_id: user.grupo_id,
      },
    }
  }

  async register(registerDto: RegisterDto) {
    // Verificar se o usuário já existe
    //const userExists = await this.usersService.findByEmail(registerDto.email)
   // return userExists

    //if (userExists) {
     // throw new BadRequestException("Email já está em uso")
    //}

    // Criar o novo usuário
    const user = await this.usersService.create({
      ...registerDto,
      password: registerDto.password,
    })

    // Retornar o token de acesso
    const { password, ...result } = user
    return this.login(result)
  }
}

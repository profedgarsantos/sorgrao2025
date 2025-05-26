import { Controller, Post, Body, UseGuards, Request, Get, HttpCode, HttpStatus } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { AuthService } from "./auth.service"
import { LoginDto } from "./dto/login.dto"
import { RegisterDto } from "./dto/register.dto"
import { JwtAuthGuard } from "./guards/jwt-auth.guard"

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: "Login de usuário" })
  @ApiResponse({ status: 200, description: "Login realizado com sucesso" })
  @ApiResponse({ status: 401, description: "Credenciais inválidas" })
  @UseGuards(AuthGuard("local"))
  async login(@Request() req: any, @Body() loginDto: LoginDto) {
    return this.authService.login(req.user)
  }

  @Post('register')
  @ApiOperation({ summary: 'Registro de novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário registrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Obter perfil do usuário logado' })
  @ApiResponse({ status: 200, description: 'Perfil obtido com sucesso' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req: any) {
    return req.user;
  }
}

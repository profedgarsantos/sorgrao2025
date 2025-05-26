import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { MotoristasService } from "./motoristas.service"
import { CreateMotoristaDto } from "./dto/create-motorista.dto"
import { UpdateMotoristaDto } from "./dto/update-motorista.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("motoristas")
@Controller("motoristas")
export class MotoristasController {
  constructor(private readonly motoristasService: MotoristasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo motorista' })
  @ApiResponse({ status: 201, description: 'Motorista criado com sucesso' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createMotoristaDto: CreateMotoristaDto) {
    return this.motoristasService.create(createMotoristaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os motoristas' })
  @ApiResponse({ status: 200, description: 'Lista de motoristas retornada com sucesso' })
  findAll(@Query('transportadora_id') transportadoraId?: string) {
    return this.motoristasService.findAll(transportadoraId ? +transportadoraId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um motorista pelo ID' })
  @ApiResponse({ status: 200, description: 'Motorista encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  findOne(@Param('id') id: string) {
    return this.motoristasService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar um motorista" })
  @ApiResponse({ status: 200, description: "Motorista atualizado com sucesso" })
  @ApiResponse({ status: 404, description: "Motorista não encontrado" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateMotoristaDto: UpdateMotoristaDto) {
    return this.motoristasService.update(+id, updateMotoristaDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um motorista' })
  @ApiResponse({ status: 200, description: 'Motorista removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Motorista não encontrado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.motoristasService.remove(+id);
  }
}

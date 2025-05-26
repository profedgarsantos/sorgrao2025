import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { EstadosService } from "../services/estados.service" // Changed from type-only import
import { CreateEstadoDto } from "../dto/create-estado.dto"
import { UpdateEstadoDto } from "../dto/update-estado.dto"
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../../auth/guards/roles.guard"
import { Roles } from "../../auth/decorators/roles.decorator"

@ApiTags("estados")
@Controller("estados")
@UseGuards(JwtAuthGuard, RolesGuard)
export class EstadosController {
  constructor(private readonly estadosService: EstadosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo estado' })
  @ApiResponse({ status: 201, description: 'Estado criado com sucesso' })
  @ApiBearerAuth()
  @Roles('admin')
  create(@Body() createEstadoDto: CreateEstadoDto) {
    return this.estadosService.create(createEstadoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os estados' })
  @ApiResponse({ status: 200, description: 'Lista de estados retornada com sucesso' })
  findAll(@Query('pais_id') paisId?: string) {
    return this.estadosService.findAll(paisId ? +paisId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um estado pelo ID' })
  @ApiResponse({ status: 200, description: 'Estado encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Estado não encontrado' })
  findOne(@Param('id') id: string) {
    return this.estadosService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar um estado" })
  @ApiResponse({ status: 200, description: "Estado atualizado com sucesso" })
  @ApiResponse({ status: 404, description: "Estado não encontrado" })
  @ApiBearerAuth()
  @Roles("admin")
  update(@Param('id') id: string, @Body() updateEstadoDto: UpdateEstadoDto) {
    return this.estadosService.update(+id, updateEstadoDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um estado' })
  @ApiResponse({ status: 200, description: 'Estado removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Estado não encontrado' })
  @ApiBearerAuth()
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.estadosService.remove(+id);
  }
}

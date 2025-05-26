import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { CidadesService } from "../services/cidades.service" // Changed from type-only import
import { CreateCidadeDto } from "../dto/create-cidade.dto"
import { UpdateCidadeDto } from "../dto/update-cidade.dto"
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../../auth/guards/roles.guard"
import { Roles } from "../../auth/decorators/roles.decorator"

@ApiTags("cidades")
@Controller("cidades")
@UseGuards(JwtAuthGuard, RolesGuard)
export class CidadesController {
  constructor(private readonly cidadesService: CidadesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova cidade' })
  @ApiResponse({ status: 201, description: 'Cidade criada com sucesso' })
  @ApiBearerAuth()
  @Roles('admin')
  create(@Body() createCidadeDto: CreateCidadeDto) {
    return this.cidadesService.create(createCidadeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as cidades' })
  @ApiResponse({ status: 200, description: 'Lista de cidades retornada com sucesso' })
  findAll(@Query('estado_id') estadoId?: string) {
    return this.cidadesService.findAll(estadoId ? +estadoId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma cidade pelo ID' })
  @ApiResponse({ status: 200, description: 'Cidade encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Cidade não encontrada' })
  findOne(@Param('id') id: string) {
    return this.cidadesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar uma cidade" })
  @ApiResponse({ status: 200, description: "Cidade atualizada com sucesso" })
  @ApiResponse({ status: 404, description: "Cidade não encontrada" })
  @ApiBearerAuth()
  @Roles("admin")
  update(@Param('id') id: string, @Body() updateCidadeDto: UpdateCidadeDto) {
    return this.cidadesService.update(+id, updateCidadeDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma cidade' })
  @ApiResponse({ status: 200, description: 'Cidade removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Cidade não encontrada' })
  @ApiBearerAuth()
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.cidadesService.remove(+id);
  }
}

import { Controller, UseGuards } from "@nestjs/common/decorators/core"
import { Body, Delete, Get, Param, Patch, Post } from "@nestjs/common/decorators/http"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { PaisesService } from "../services/paises.service" // Changed from type-only import
import { CreatePaisDto } from "../dto/create-pais.dto"
import { UpdatePaisDto } from "../dto/update-pais.dto"
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../../auth/guards/roles.guard"
import { Roles } from "../../auth/decorators/roles.decorator"

@ApiTags("paises")
@Controller("paises")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PaisesController {
  
  constructor(private readonly paisesService: PaisesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo país' })
  @ApiResponse({ status: 201, description: 'País criado com sucesso' })
  @Roles('admin')
  create(@Body() createPaisDto: CreatePaisDto) {
    return this.paisesService.create(createPaisDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todos os países" })
  @ApiResponse({ status: 200, description: "Lista de países retornada com sucesso" })
  findAll() {
    return this.paisesService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um país pelo ID' })
  @ApiResponse({ status: 200, description: 'País encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'País não encontrado' })
  findOne(@Param('id') id: string) {
    return this.paisesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar um país" })
  @ApiResponse({ status: 200, description: "País atualizado com sucesso" })
  @ApiResponse({ status: 404, description: "País não encontrado" })
  @Roles("admin")
  update(@Param('id') id: string, @Body() updatePaisDto: UpdatePaisDto) {
    return this.paisesService.update(+id, updatePaisDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um país' })
  @ApiResponse({ status: 200, description: 'País removido com sucesso' })
  @ApiResponse({ status: 404, description: 'País não encontrado' })
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.paisesService.remove(+id);
  }
}

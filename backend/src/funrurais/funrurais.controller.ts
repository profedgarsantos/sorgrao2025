import { Controller, UseGuards } from "@nestjs/common/decorators/core"
import { Body, Delete, Get, Param, Patch, Post } from "@nestjs/common/decorators/http"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { FunruraisService } from "./funrurais.service"
import { CreateFunruralDto } from "./dto/create-funrural.dto"
import { UpdateFunruralDto } from "./dto/update-funrural.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { RolesGuard } from "../auth/guards/roles.guard"

@ApiTags("funrurais")
@Controller("funrurais")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class FunruraisController {
  constructor(private readonly funruraisService: FunruraisService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo funrural' })
  @ApiResponse({ status: 201, description: 'Funrural criado com sucesso' })
  @Roles('admin')
  create(@Body() createFunruralDto: CreateFunruralDto) {
    return this.funruraisService.create(createFunruralDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todos os funrurais" })
  @ApiResponse({ status: 200, description: "Lista de funrurais retornada com sucesso" })
  findAll() {
    return this.funruraisService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um funrural pelo ID' })
  @ApiResponse({ status: 200, description: 'Funrural encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Funrural não encontrado' })
  findOne(@Param('id') id: string) {
    return this.funruraisService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar um funrural" })
  @ApiResponse({ status: 200, description: "Funrural atualizado com sucesso" })
  @ApiResponse({ status: 404, description: "Funrural não encontrado" })
  @Roles("admin")
  update(@Param('id') id: string, @Body() updateFunruralDto: UpdateFunruralDto) {
    return this.funruraisService.update(+id, updateFunruralDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um funrural' })
  @ApiResponse({ status: 200, description: 'Funrural removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Funrural não encontrado' })
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.funruraisService.remove(+id);
  }
}

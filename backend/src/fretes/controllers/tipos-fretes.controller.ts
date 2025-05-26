import { Controller, UseGuards } from "@nestjs/common/decorators/core"
import { Body, Delete, Get, Param, Patch, Post } from "@nestjs/common/decorators/http"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { TiposFretesService } from "../services/tipos-fretes.service"
import { CreateTipoFreteDto } from "../dto/create-tipo-frete.dto"
import { UpdateTipoFreteDto } from "../dto/update-tipo-frete.dto"
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard"

@ApiTags("tipos-fretes")
@Controller("tipos-fretes")
export class TiposFretesController {
  constructor(private readonly tiposFretesService: TiposFretesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo tipo de frete' })
  @ApiResponse({ status: 201, description: 'Tipo de frete criado com sucesso' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTipoFreteDto: CreateTipoFreteDto) {
    return this.tiposFretesService.create(createTipoFreteDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todos os tipos de frete" })
  @ApiResponse({ status: 200, description: "Lista de tipos de frete retornada com sucesso" })
  findAll() {
    return this.tiposFretesService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um tipo de frete pelo ID' })
  @ApiResponse({ status: 200, description: 'Tipo de frete encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Tipo de frete não encontrado' })
  findOne(@Param('id') id: string) {
    return this.tiposFretesService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar um tipo de frete" })
  @ApiResponse({ status: 200, description: "Tipo de frete atualizado com sucesso" })
  @ApiResponse({ status: 404, description: "Tipo de frete não encontrado" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTipoFreteDto: UpdateTipoFreteDto) {
    return this.tiposFretesService.update(+id, updateTipoFreteDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um tipo de frete' })
  @ApiResponse({ status: 200, description: 'Tipo de frete removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Tipo de frete não encontrado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.tiposFretesService.remove(+id);
  }
}

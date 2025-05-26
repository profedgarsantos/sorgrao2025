import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { GruposService } from "./grupos.service";
import { UpdateGrupoDto } from "./dto/update-grupo.dto";
import { CreateGrupoDto } from "./dto/create-grupo.dto";

@ApiTags("grupos")
@Controller("grupos")
export class GruposController {
  constructor(private readonly gruposService: GruposService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo comprador' })
  @ApiResponse({ status: 201, description: 'Comprador criado com sucesso' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createGrupoDto: CreateGrupoDto) {
    return this.gruposService.create(createGrupoDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todos os grupos" })
  @ApiResponse({ status: 200, description: 'Lista de grupos retornada com sucesso' })
  findAll(@Query('cidade_id') cidadeId?: string) {
    return this.gruposService.findAll(cidadeId ? +cidadeId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um Grupo pelo ID' })
  @ApiResponse({ status: 200, description: 'Grupo encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Grupo não encontrado' })
  findOne(@Param('id') id: string) {
    return this.gruposService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar um Grupo" })
  @ApiResponse({ status: 200, description: "Grupo atualizado com sucesso" })
  @ApiResponse({ status: 404, description: "Comprador não encontrado" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCompradorDto: UpdateGrupoDto) {
    return this.gruposService.update(+id, updateCompradorDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um comprador' })
  @ApiResponse({ status: 200, description: 'Comprador removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Comprador não encontrado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.gruposService.remove(+id);
  }
}

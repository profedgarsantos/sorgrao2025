import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { CompradoresService } from "./compradores.service"
import { CreateCompradorDto } from "./dto/create-comprador.dto"
import { UpdateCompradorDto } from "./dto/update-comprador.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("compradores")
@Controller("compradores")
export class CompradoresController {
  constructor(private readonly compradoresService: CompradoresService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo comprador' })
  @ApiResponse({ status: 201, description: 'Comprador criado com sucesso' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createCompradorDto: CreateCompradorDto) {
    return this.compradoresService.create(createCompradorDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todos os compradores" })
  @ApiResponse({ status: 200, description: 'Lista de compradores retornada com sucesso' })
  findAll(@Query('cidade_id') cidadeId?: string) {
    return this.compradoresService.findAll(cidadeId ? +cidadeId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um comprador pelo ID' })
  @ApiResponse({ status: 200, description: 'Comprador encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Comprador não encontrado' })
  findOne(@Param('id') id: string) {
    return this.compradoresService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar um comprador" })
  @ApiResponse({ status: 200, description: "Comprador atualizado com sucesso" })
  @ApiResponse({ status: 404, description: "Comprador não encontrado" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateCompradorDto: UpdateCompradorDto) {
    return this.compradoresService.update(+id, updateCompradorDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um comprador' })
  @ApiResponse({ status: 200, description: 'Comprador removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Comprador não encontrado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.compradoresService.remove(+id);
  }
}

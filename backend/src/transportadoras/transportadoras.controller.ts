import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { TransportadorasService } from "./transportadoras.service"
import { CreateTransportadoraDto } from "./dto/create-transportadora.dto"
import { UpdateTransportadoraDto } from "./dto/update-transportadora.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("transportadoras")
@Controller("transportadoras")
export class TransportadorasController {
  constructor(private readonly transportadorasService: TransportadorasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar uma nova transportadora' })
  @ApiResponse({ status: 201, description: 'Transportadora criada com sucesso' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createTransportadoraDto: CreateTransportadoraDto) {
    return this.transportadorasService.create(createTransportadoraDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as transportadoras' })
  @ApiResponse({ status: 200, description: 'Lista de transportadoras retornada com sucesso' })
  findAll(@Query('cidade_id') cidadeId?: string) {
    return this.transportadorasService.findAll(cidadeId ? +cidadeId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma transportadora pelo ID' })
  @ApiResponse({ status: 200, description: 'Transportadora encontrada com sucesso' })
  @ApiResponse({ status: 404, description: 'Transportadora não encontrada' })
  findOne(@Param('id') id: string) {
    return this.transportadorasService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar uma transportadora" })
  @ApiResponse({ status: 200, description: "Transportadora atualizada com sucesso" })
  @ApiResponse({ status: 404, description: "Transportadora não encontrada" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateTransportadoraDto: UpdateTransportadoraDto) {
    return this.transportadorasService.update(+id, updateTransportadoraDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma transportadora' })
  @ApiResponse({ status: 200, description: 'Transportadora removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Transportadora não encontrada' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.transportadorasService.remove(+id);
  }
}

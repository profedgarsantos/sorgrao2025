import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { VeiculosService } from "./veiculos.service"
import { CreateVeiculoDto } from "./dto/create-veiculo.dto"
import { UpdateVeiculoDto } from "./dto/update-veiculo.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("veiculos")
@Controller("veiculos")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class VeiculosController {
  constructor(private readonly veiculosService: VeiculosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo veículo' })
  @ApiResponse({ status: 201, description: 'Veículo criado com sucesso' })
  create(@Body() createVeiculoDto: CreateVeiculoDto) {
    return this.veiculosService.create(createVeiculoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os veículos' })
  @ApiResponse({ status: 200, description: 'Lista de veículos retornada com sucesso' })
  findAll(@Query('transportadora_id') transportadoraId?: string) {
    return this.veiculosService.findAll(transportadoraId ? +transportadoraId : undefined);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um veículo pelo ID' })
  @ApiResponse({ status: 200, description: 'Veículo encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  findOne(@Param('id') id: string) {
    return this.veiculosService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar um veículo" })
  @ApiResponse({ status: 200, description: "Veículo atualizado com sucesso" })
  @ApiResponse({ status: 404, description: "Veículo não encontrado" })
  update(@Param('id') id: string, @Body() updateVeiculoDto: UpdateVeiculoDto) {
    return this.veiculosService.update(+id, updateVeiculoDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um veículo' })
  @ApiResponse({ status: 200, description: 'Veículo removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  remove(@Param('id') id: string) {
    return this.veiculosService.remove(+id);
  }
}

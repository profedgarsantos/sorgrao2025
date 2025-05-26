import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, HttpStatus } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { ComissionadosService } from "./comissionados.service"
import { CreateComissionadoDto } from "./dto/create-comissionado.dto"
import { UpdateComissionadoDto } from "./dto/update-comissionado.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("comissionados")
@Controller("comissionados")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ComissionadosController {
  constructor(private readonly comissionadosService: ComissionadosService) {}

  @Post()
  @ApiOperation({ summary: "Registrar um novo comissionamento" })
  @ApiResponse({ status: HttpStatus.CREATED, description: "Comissionamento registrado com sucesso" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Dados inválidos" })
  create(@Body() createComissionadoDto: CreateComissionadoDto) {
    return this.comissionadosService.create(createComissionadoDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todos os comissionamentos" })
  @ApiResponse({ status: HttpStatus.OK, description: "Lista de comissionamentos retornada com sucesso" })
  findAll(
    @Query("vendedor_id") vendedorId?: string,
    @Query("data_inicio") dataInicio?: string,
    @Query("data_fim") dataFim?: string,
    @Query("status") status?: string,
  ) {
    return this.comissionadosService.findAll({
      vendedorId: vendedorId ? +vendedorId : undefined,
      dataInicio,
      dataFim,
      status,
    })
  }

  @Get("relatorio")
  @ApiOperation({ summary: "Obter relatório de comissionamentos" })
  @ApiResponse({ status: HttpStatus.OK, description: "Relatório de comissionamentos retornado com sucesso" })
  getRelatorio(
    @Query("data_inicio") dataInicio?: string,
    @Query("data_fim") dataFim?: string,
    @Query("vendedor_id") vendedorId?: string,
  ) {
    return this.comissionadosService.getRelatorio(dataInicio, dataFim, vendedorId ? +vendedorId : undefined)
  }

  @Get(":id")
  @ApiOperation({ summary: "Obter um comissionamento pelo ID" })
  @ApiResponse({ status: HttpStatus.OK, description: "Comissionamento encontrado com sucesso" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Comissionamento não encontrado" })
  findOne(@Param("id") id: string) {
    return this.comissionadosService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar um comissionamento" })
  @ApiResponse({ status: HttpStatus.OK, description: "Comissionamento atualizado com sucesso" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Comissionamento não encontrado" })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Dados inválidos" })
  update(@Param('id') id: string, @Body() updateComissionadoDto: UpdateComissionadoDto) {
    return this.comissionadosService.update(+id, updateComissionadoDto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remover um comissionamento" })
  @ApiResponse({ status: HttpStatus.OK, description: "Comissionamento removido com sucesso" })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: "Comissionamento não encontrado" })
  remove(@Param("id") id: string) {
    return this.comissionadosService.remove(+id);
  }
}

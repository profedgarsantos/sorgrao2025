import { Controller, UseGuards } from "@nestjs/common/decorators/core"
import { Body, Delete, Get, Param, Patch, Post } from "@nestjs/common/decorators/http"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { FretesService } from "./fretes.service"
import { CreateFreteDto } from "./dto/create-frete.dto"
import { UpdateFreteDto } from "./dto/update-frete.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { Roles } from "../auth/decorators/roles.decorator"
import { RolesGuard } from "../auth/guards/roles.guard"

@ApiTags("fretes")
@Controller("fretes")
@UseGuards(JwtAuthGuard, RolesGuard)
export class FretesController {
  constructor(private readonly fretesService: FretesService) {}

  @Post()
  @ApiOperation({ summary: "Criar uma nova tabela de frete" })
  @ApiResponse({ status: 201, description: "Tabela de frete criada com sucesso" })
  @ApiBearerAuth()
  @Roles("admin")
  create(@Body() createFreteDto: CreateFreteDto) {
    return this.fretesService.create(createFreteDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todas as tabelas de frete" })
  @ApiResponse({ status: 200, description: "Tabelas de frete listadas com sucesso" })
  @ApiBearerAuth()
  findAll() {
    return this.fretesService.findAll()
  }

  @Get(":id")
  @ApiOperation({ summary: "Buscar uma tabela de frete pelo ID" })
  @ApiResponse({ status: 200, description: "Tabela de frete encontrada com sucesso" })
  @ApiBearerAuth()
  findOne(@Param("id") id: string) {
    return this.fretesService.findOne(+id)
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar uma tabela de frete" })
  @ApiResponse({ status: 200, description: "Tabela de frete atualizada com sucesso" })
  @ApiBearerAuth()
  @Roles("admin")
  update(@Param("id") id: string, @Body() updateFreteDto: UpdateFreteDto) {
    return this.fretesService.update(+id, updateFreteDto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remover uma tabela de frete" })
  @ApiResponse({ status: 200, description: "Tabela de frete removida com sucesso" })
  @ApiBearerAuth()
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.fretesService.remove(+id)
  }
}

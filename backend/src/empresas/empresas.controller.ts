import { Controller, UseGuards } from "@nestjs/common/decorators/core"
import { Body, Delete, Get, Param, Patch, Post } from "@nestjs/common/decorators/http"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { EmpresasService } from "./empresas.service" // Changed from type-only import
import { CreateEmpresaDto } from "./dto/create-empresa.dto"
import { UpdateEmpresaDto } from "./dto/update-empresa.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"

@ApiTags("empresas")
@Controller("empresas")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmpresasController {
  constructor(private readonly empresasService: EmpresasService) {}

  @Post()
  @ApiOperation({ summary: "Criar uma nova empresa" })
  @ApiResponse({ status: 201, description: "Empresa criada com sucesso" })
  @Roles("admin")
  create(@Body() createEmpresaDto: CreateEmpresaDto) {
    return this.empresasService.create(createEmpresaDto);
  }

  @Get()
  @ApiOperation({ summary: "Listar todas as empresas" })
  @ApiResponse({ status: 200, description: "Lista de empresas retornada com sucesso" })
  @Roles("admin")
  findAll() {
    return this.empresasService.findAll()
  }

  @Get(":id")
  @ApiOperation({ summary: "Obter uma empresa pelo ID" })
  @ApiResponse({ status: 200, description: "Empresa encontrada com sucesso" })
  @ApiResponse({ status: 404, description: "Empresa não encontrada" })
  @Roles("admin")
  findOne(@Param("id") id: string) {
    return this.empresasService.findOne(+id)
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar uma empresa" })
  @ApiResponse({ status: 200, description: "Empresa atualizada com sucesso" })
  @ApiResponse({ status: 404, description: "Empresa não encontrada" })
  @Roles("admin")
  update(@Param("id") id: string, @Body() updateEmpresaDto: UpdateEmpresaDto) {
    return this.empresasService.update(+id, updateEmpresaDto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remover uma empresa" })
  @ApiResponse({ status: 200, description: "Empresa removida com sucesso" })
  @ApiResponse({ status: 404, description: "Empresa não encontrada" })
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.empresasService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { VendedoresService } from "./vendedores.service" // Changed from type-only import
import { CreateVendedorDto } from "./dto/create-vendedor.dto"
import { UpdateVendedorDto } from "./dto/update-vendedor.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"

@ApiTags("vendedores")
@Controller("vendedores")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class VendedoresController {
  constructor(private readonly vendedoresService: VendedoresService) {}

  @Post()
  @ApiOperation({ summary: "Criar um novo vendedor" })
  @ApiResponse({ status: 201, description: "Vendedor criado com sucesso" })
  @Roles("admin")
  create(@Body() createVendedorDto: CreateVendedorDto) {
    return this.vendedoresService.create(createVendedorDto);
  }

  @Get("empresa/:empresaId")
  @ApiOperation({ summary: "Listar vendedores por empresa" })
  @ApiResponse({ status: 200, description: "Lista de vendedores retornada com sucesso" })
  @Roles("admin", "comissionado", "vendedor")
  findByEmpresa(@Param("empresaId") empresaId: string, @Request() req: any) {
    // Se for vendedor, só pode ver os próprios dados
    if (req.user.grupo_id === 3) {
      return this.vendedoresService.findByUsuarioAndEmpresa(req.user.id, +empresaId)
    }
    // Admin e comissionado podem ver todos
    return this.vendedoresService.findByEmpresa(+empresaId)
  }

  @Get(":id/empresa/:empresaId")
  @ApiOperation({ summary: "Obter um vendedor pelo ID" })
  @ApiResponse({ status: 200, description: "Vendedor encontrado com sucesso" })
  @ApiResponse({ status: 404, description: "Vendedor não encontrado" })
  @Roles("admin", "comissionado", "vendedor")
  findOne(@Param("id") id: string, @Param("empresaId") empresaId: string, @Request() req: any) {
    // Se for vendedor, só pode ver os próprios dados
    if (req.user.grupo_id === 3) {
      return this.vendedoresService.findByIdAndUsuarioAndEmpresa(+id, req.user.id, +empresaId)
    }
    // Admin e comissionado podem ver todos
    return this.vendedoresService.findByIdAndEmpresa(+id, +empresaId)
  }

  @Patch(":id/empresa/:empresaId")
  @ApiOperation({ summary: "Atualizar um vendedor" })
  @ApiResponse({ status: 200, description: "Vendedor atualizado com sucesso" })
  @ApiResponse({ status: 404, description: "Vendedor não encontrado" })
  @Roles("admin")
  update(@Param("id") id: string, @Param("empresaId") empresaId: string, @Body() updateVendedorDto: UpdateVendedorDto) {
    return this.vendedoresService.update(+id, +empresaId, updateVendedorDto)
  }

  @Delete(":id/empresa/:empresaId")
  @ApiOperation({ summary: "Remover um vendedor" })
  @ApiResponse({ status: 200, description: "Vendedor removido com sucesso" })
  @ApiResponse({ status: 404, description: "Vendedor não encontrado" })
  @Roles("admin")
  remove(@Param("id") id: string, @Param("empresaId") empresaId: string) {
    return this.vendedoresService.remove(+id, +empresaId)
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { OfertasService } from "./ofertas.service"
import { CreateOfertaDto } from "./dto/create-oferta.dto"
import { UpdateOfertaDto } from "./dto/update-oferta.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { RolesGuard } from "../auth/guards/roles.guard"
import { Roles } from "../auth/decorators/roles.decorator"

@ApiTags("ofertas")
@Controller("ofertas")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class OfertasController {
  constructor(private readonly ofertasService: OfertasService) {}

  @Post()
  @ApiOperation({ summary: "Criar uma nova oferta" })
  @ApiResponse({ status: 201, description: "Oferta criada com sucesso" })
  @Roles("admin", "vendedor")
  create(@Body() createOfertaDto: CreateOfertaDto) {
    return this.ofertasService.create(createOfertaDto)
  }

  @Get()
  @ApiOperation({ summary: "Listar todas as ofertas" })
  @ApiResponse({ status: 200, description: "Lista de ofertas retornada com sucesso" })
  @Roles("admin", "comissionado", "comprador")
  findAll(@Query() query: { empresaId?: string }) {
    const empresaId = query.empresaId;
    return this.ofertasService.findAll(empresaId ? +empresaId : undefined);
  }

  @Get("ativas")
  @ApiOperation({ summary: "Listar ofertas ativas" })
  @ApiResponse({ status: 200, description: "Lista de ofertas ativas retornada com sucesso" })
  @Roles("admin", "comissionado", "comprador")
  findAtivas(@Query() query: { empresaId?: string }) {
    const empresaId = query.empresaId;
    return this.ofertasService.findAtivas(empresaId ? +empresaId : undefined);
  }

  @Get(":id")
  @ApiOperation({ summary: "Obter uma oferta pelo ID" })
  @ApiResponse({ status: 200, description: "Oferta encontrada com sucesso" })
  @ApiResponse({ status: 404, description: "Oferta não encontrada" })
  @Roles("admin", "comissionado", "vendedor", "comprador")
  findOne(@Param("id") id: string) {
    return this.ofertasService.findOne(+id)
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar uma oferta" })
  @ApiResponse({ status: 200, description: "Oferta atualizada com sucesso" })
  @ApiResponse({ status: 404, description: "Oferta não encontrada" })
  @Roles("admin", "vendedor")
  update(@Param("id") id: string, @Body() updateOfertaDto: UpdateOfertaDto) {
    return this.ofertasService.update(+id, updateOfertaDto)
  }

  @Delete(":id")
  @ApiOperation({ summary: "Remover uma oferta" })
  @ApiResponse({ status: 200, description: "Oferta removida com sucesso" })
  @ApiResponse({ status: 404, description: "Oferta não encontrada" })
  @Roles("admin")
  remove(@Param("id") id: string) {
    return this.ofertasService.remove(+id)
  }

  @Patch(":id/cancelar")
  @ApiOperation({ summary: "Cancelar uma oferta" })
  @ApiResponse({ status: 200, description: "Oferta cancelada com sucesso" })
  @ApiResponse({ status: 404, description: "Oferta não encontrada" })
  @Roles("admin", "vendedor")
  cancelar(@Param("id") id: string) {
    return this.ofertasService.cancelar(+id)
  }
}

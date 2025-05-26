import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger"
import { ProdutosService } from "./produtos.service"
import { CreateProdutoDto } from "./dto/create-produto.dto"
import { UpdateProdutoDto } from "./dto/update-produto.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("produtos")
@Controller("produtos")
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtosService.create(createProdutoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os produtos' })
  @ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso' })
  findAll(@Query('tipo') tipo?: string) {
    return this.produtosService.findAll(tipo);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um produto pelo ID' })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  findOne(@Param('id') id: string) {
    return this.produtosService.findOne(+id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Atualizar um produto" })
  @ApiResponse({ status: 200, description: "Produto atualizado com sucesso" })
  @ApiResponse({ status: 404, description: "Produto não encontrado" })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtosService.update(+id, updateProdutoDto)
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um produto' })
  @ApiResponse({ status: 200, description: 'Produto removido com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.produtosService.remove(+id);
  }
}

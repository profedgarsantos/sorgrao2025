import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FechamentosService } from './fechamentos.service';
import { CreateFechamentoDto } from './dto/create-fechamento.dto';
import { UpdateFechamentoDto } from './dto/update-fechamento.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Fechamento } from './entities/fechamento.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Fechamentos')
@Controller('fechamentos')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class FechamentosController {
  constructor(private readonly fechamentosService: FechamentosService) {}

  @Post()
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Cria um novo fechamento' })
  @ApiCreatedResponse({ description: 'Fechamento criado com sucesso', type: Fechamento })
  create(@Body() createFechamentoDto: CreateFechamentoDto) {
    return this.fechamentosService.create(createFechamentoDto);
  }

  @Get()
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Lista todos os fechamentos' })
  @ApiOkResponse({ description: 'Lista de fechamentos retornada com sucesso', type: [Fechamento] })
  findAll() {
    return this.fechamentosService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Busca um fechamento pelo ID' })
  @ApiOkResponse({ description: 'Fechamento retornado com sucesso', type: Fechamento })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fechamentosService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Atualiza um fechamento existente' })
  @ApiOkResponse({ description: 'Fechamento atualizado com sucesso', type: Fechamento })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateFechamentoDto: UpdateFechamentoDto) {
    return this.fechamentosService.update(id, updateFechamentoDto);
  }

  @Delete(':id')
  @Roles('admin')
  @ApiOperation({ summary: 'Remove um fechamento existente' })
  @ApiOkResponse({ description: 'Fechamento removido com sucesso' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fechamentosService.remove(id);
  }
}

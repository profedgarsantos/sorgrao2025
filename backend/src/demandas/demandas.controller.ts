import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { DemandasService } from './demandas.service';
import { CreateDemandaDto } from './dto/create-demanda.dto';
import { UpdateDemandaDto } from './dto/update-demanda.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Demanda } from './entities/demanda.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Demandas')
@Controller('demandas')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class DemandasController {
  constructor(private readonly demandasService: DemandasService) {}

  @Post()
  @Roles('admin', 'user') // Define roles that can access this endpoint
  @ApiOperation({ summary: 'Cria uma nova demanda' })
  @ApiCreatedResponse({ description: 'Demanda criada com sucesso', type: Demanda })
  create(@Body() createDemandaDto: CreateDemandaDto) {
    return this.demandasService.create(createDemandaDto);
  }

  @Get()
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Lista todas as demandas' })
  @ApiOkResponse({ description: 'Lista de demandas retornada com sucesso', type: [Demanda] })
  findAll() {
    return this.demandasService.findAll();
  }

  @Get(':id')
  @Roles('admin', 'user')
  @ApiOperation({ summary: 'Busca uma demanda pelo ID' })
  @ApiOkResponse({ description: 'Demanda retornada com sucesso', type: Demanda })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.demandasService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin') // Only admin can update
  @ApiOperation({ summary: 'Atualiza uma demanda existente' })
  @ApiOkResponse({ description: 'Demanda atualizada com sucesso', type: Demanda })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateDemandaDto: UpdateDemandaDto) {
    return this.demandasService.update(id, updateDemandaDto);
  }

  @Delete(':id')
  @Roles('admin') // Only admin can delete
  @ApiOperation({ summary: 'Remove uma demanda existente' })
  @ApiOkResponse({ description: 'Demanda removida com sucesso' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.demandasService.remove(id);
  }
}

import { Controller, Post, Body, Get, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { ExpedicaoService } from './expedicaos.service';
import { CreateExpedicaoDto } from './dto/create-expedicao.dto';
import { UpdateExpedicaoDto } from './dto/update-expedicao.dto';

@Controller('expedicaos')
export class ExpedicaosController {
  constructor(private readonly expedicaoService: ExpedicaoService) {}

  @Post()
  create(@Body() createExpedicaoDto: CreateExpedicaoDto) {
    return this.expedicaoService.create(createExpedicaoDto);
  }

  @Get()
  findAll() {
    return this.expedicaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.expedicaoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateExpedicaoDto: UpdateExpedicaoDto) {
    return this.expedicaoService.update(id, updateExpedicaoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.expedicaoService.remove(id);
  }
}

import { Module } from '@nestjs/common';
import { ExpedicaoService } from './expedicaos.service';
import { ExpedicaosController } from './expedicaos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expedicao } from './entities/expedicao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Expedicao])],
  controllers: [ExpedicaosController],
  providers: [ExpedicaoService],
  exports: [ExpedicaoService]
})
export class ExpedicaoModule {}

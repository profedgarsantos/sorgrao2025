import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expedicao } from './entities/expedicao.entity';
import { CreateExpedicaoDto } from './dto/create-expedicao.dto';
import { UpdateExpedicaoDto } from './dto/update-expedicao.dto';

@Injectable()
export class ExpedicaoService {
  constructor(
    @InjectRepository(Expedicao)
    private expedicaoRepository: Repository<Expedicao>,
  ) {}

  async create(createExpedicaoDto: CreateExpedicaoDto): Promise<Expedicao> {
    const expedicao = this.expedicaoRepository.create(createExpedicaoDto);
    return await this.expedicaoRepository.save(expedicao);
  }

  async findAll(): Promise<Expedicao[]> {
    return await this.expedicaoRepository.find();
  }

  async findOne(id: number): Promise<Expedicao> {
    return await this.expedicaoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateExpedicaoDto: UpdateExpedicaoDto): Promise<Expedicao> {
    await this.expedicaoRepository.update(id, updateExpedicaoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.expedicaoRepository.delete(id);
  }
}

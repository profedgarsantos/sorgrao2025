import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Fechamento } from './entities/fechamento.entity';
import { CreateFechamentoDto } from './dto/create-fechamento.dto';
import { UpdateFechamentoDto } from './dto/update-fechamento.dto';

@Injectable()
export class FechamentosService {
  constructor(
    @InjectRepository(Fechamento)
    private readonly fechamentoRepository: Repository<Fechamento>,
  ) {}

  async create(createFechamentoDto: CreateFechamentoDto): Promise<Fechamento> {
    const fechamento = this.fechamentoRepository.create(createFechamentoDto);
    return this.fechamentoRepository.save(fechamento);
  }

  async findAll(): Promise<Fechamento[]> {
    return this.fechamentoRepository.find({
      relations: ['oferta', 'demanda', 'empresa'],
    });
  }

  async findOne(id: number): Promise<Fechamento> {
    const fechamento = await this.fechamentoRepository.findOne({
      where: { id },
      relations: ['oferta', 'demanda', 'empresa'],
    });
    if (!fechamento) {
      throw new NotFoundException(`Fechamento with ID ${id} not found`);
    }
    return fechamento;
  }

  async update(id: number, updateFechamentoDto: UpdateFechamentoDto): Promise<Fechamento> {
    const fechamento = await this.findOne(id); // reutiliza o findOne para checar se existe
    this.fechamentoRepository.merge(fechamento, updateFechamentoDto);
    return this.fechamentoRepository.save(fechamento);
  }

  async remove(id: number): Promise<void> {
    const fechamento = await this.findOne(id); // reutiliza o findOne para checar se existe
    await this.fechamentoRepository.remove(fechamento);
  }
}

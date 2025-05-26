import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demanda } from './entities/demanda.entity';
import { CreateDemandaDto } from './dto/create-demanda.dto';
import { UpdateDemandaDto } from './dto/update-demanda.dto';

@Injectable()
export class DemandasService {
  constructor(
    @InjectRepository(Demanda)
    private readonly demandaRepository: Repository<Demanda>,
  ) {}

  async create(createDemandaDto: CreateDemandaDto): Promise<Demanda> {
    const demanda = this.demandaRepository.create(createDemandaDto);
    return this.demandaRepository.save(demanda);
  }

  async findAll(): Promise<Demanda[]> {
    return this.demandaRepository.find({
      relations: ['produto', 'comprador', 'empresa', 'fechamentos'],
    });
  }

  async findOne(id: number): Promise<Demanda> {
    const demanda = await this.demandaRepository.findOne({
      where: { id },
      relations: ['produto', 'comprador', 'empresa', 'fechamentos'],
    });
    if (!demanda) {
      throw new NotFoundException(`Demanda with ID ${id} not found`);
    }
    return demanda;
  }

  async update(id: number, updateDemandaDto: UpdateDemandaDto): Promise<Demanda> {
    const demanda = await this.findOne(id); // reutiliza o findOne para checar se existe
    this.demandaRepository.merge(demanda, updateDemandaDto);
    return this.demandaRepository.save(demanda);
  }

  async remove(id: number): Promise<void> {
    const demanda = await this.findOne(id); // reutiliza o findOne para checar se existe
    await this.demandaRepository.remove(demanda);
  }
}

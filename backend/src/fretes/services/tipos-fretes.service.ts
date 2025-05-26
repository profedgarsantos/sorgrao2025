import { Injectable, NotFoundException } from "@nestjs/common"
import { Repository } from "typeorm"
import { TipoFrete } from "../entities/tipo-frete.entity"
import { CreateTipoFreteDto } from "../dto/create-tipo-frete.dto"
import { UpdateTipoFreteDto } from "../dto/update-tipo-frete.dto"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class TiposFretesService {

  constructor(
    @InjectRepository(TipoFrete)
    private readonly tiposFretesRepository: Repository<TipoFrete>, // Injected directly
  ) { }

  async create(createTipoFreteDto: CreateTipoFreteDto): Promise<TipoFrete> {
    const tipoFrete = this.tiposFretesRepository.create(createTipoFreteDto)
    return this.tiposFretesRepository.save(tipoFrete)
  }

  async findAll(): Promise<TipoFrete[]> {
    return this.tiposFretesRepository.find({
      order: { nome: "ASC" },
    })
  }

  async findOne(id: number): Promise<TipoFrete> {
    const tipoFrete = await this.tiposFretesRepository.findOne({
      where: { id },
    })

    if (!tipoFrete) {
      throw new NotFoundException(`Tipo de frete com ID ${id} não encontrado`)
    }

    return tipoFrete
  }

  async update(id: number, updateTipoFreteDto: UpdateTipoFreteDto): Promise<TipoFrete> {
    const tipoFrete = await this.findOne(id)
    this.tiposFretesRepository.merge(tipoFrete, updateTipoFreteDto)
    return this.tiposFretesRepository.save(tipoFrete)
  }

  async remove(id: number): Promise<void> {
    const tipoFrete = await this.findOne(id)
    await this.tiposFretesRepository.remove(tipoFrete)
  }
}

import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { LessThanOrEqual, MoreThanOrEqual, type Repository } from "typeorm"
import { CreateFreteDto } from "./dto/create-frete.dto"
import { UpdateFreteDto } from "./dto/update-frete.dto"
import { Frete } from "./entities/frete.entity"

@Injectable()
export class FretesService {
  constructor(
    @InjectRepository(Frete)
    private fretesRepository: Repository<Frete>,
  ) { }

  async create(createFreteDto: CreateFreteDto): Promise<Frete> {
    const frete = this.fretesRepository.create(createFreteDto)
    return this.fretesRepository.save(frete)
  }

  async findAll(): Promise<Frete[]> {
    return this.fretesRepository.find({
      relations: ["tipo_frete"],
      order: { distanciainicial: "ASC" },
    })
  }

  async findOne(id: number): Promise<Frete> {
    const frete = await this.fretesRepository.findOne({
      where: { id },
      relations: ["tipo_frete"],
    })

    if (!frete) {
      throw new NotFoundException(`Tabela de frete com ID ${id} não encontrada`)
    }

    return frete
  }

  async findByDistancia(distancia: number): Promise<Frete | null> {
    // Busca uma tabela de frete onde a distância está entre o inicial e final
    const frete = await this.fretesRepository.findOne({
      where: [
        {
          distanciainicial: LessThanOrEqual(distancia),
          distanciafinal: MoreThanOrEqual(distancia),
        },
        {
          distanciainicial: distancia,
          distanciafinal: null,
        },
      ],
      relations: ["tipo_frete"],
    })

    return frete
  }

  async update(id: number, updateFreteDto: UpdateFreteDto): Promise<Frete> {
    const frete = await this.findOne(id)
    this.fretesRepository.merge(frete, updateFreteDto)
    return this.fretesRepository.save(frete)
  }

  async remove(id: number): Promise<void> {
    const frete = await this.findOne(id)
    await this.fretesRepository.remove(frete)
  }
}

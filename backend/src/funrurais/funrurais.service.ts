import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Funrural } from "./entities/funrural.entity"
import { CreateFunruralDto } from "./dto/create-funrural.dto"
import { UpdateFunruralDto } from "./dto/update-funrural.dto"

@Injectable()
export class FunruraisService {
  constructor(
    @InjectRepository(Funrural)
    private readonly funruraisRepository: Repository<Funrural>,
  ) { }

  async create(createFunruralDto: CreateFunruralDto): Promise<Funrural> {
    const funrural = this.funruraisRepository.create(createFunruralDto)
    return this.funruraisRepository.save(funrural)
  }

  async findAll(): Promise<Funrural[]> {
    return this.funruraisRepository.find({
      order: { descricao: "ASC" },
    })
  }

  async findOne(id: number): Promise<Funrural> {
    const funrural = await this.funruraisRepository.findOne({
      where: { id },
    })

    if (!funrural) {
      throw new NotFoundException(`Funrural com ID ${id} não encontrado`)
    }

    return funrural
  }

  async update(id: number, updateFunruralDto: UpdateFunruralDto): Promise<Funrural> {
    const funrural = await this.findOne(id)
    this.funruraisRepository.merge(funrural, updateFunruralDto)
    return this.funruraisRepository.save(funrural)
  }

  async remove(id: number): Promise<void> {
    const funrural = await this.findOne(id)
    await this.funruraisRepository.remove(funrural)
  }
}

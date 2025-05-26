import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Pais } from "../entities/pais.entity"
import { CreatePaisDto } from "../dto/create-pais.dto"
import { UpdatePaisDto } from "../dto/update-pais.dto"

@Injectable()
export class PaisesService {

  
  constructor(
    @InjectRepository(Pais)
    private paisesRepository: Repository<Pais>,
  ) {}

  async create(createPaisDto: CreatePaisDto): Promise<Pais> {
    const pais = this.paisesRepository.create(createPaisDto)
    return this.paisesRepository.save(pais)
  }

  async findAll(): Promise<Pais[]> {
    return this.paisesRepository.find({
      order: { nome: "ASC" },
    })
  }

  async findOne(id: number): Promise<Pais> {
    const pais = await this.paisesRepository.findOne({
      where: { id },
    })

    if (!pais) {
      throw new NotFoundException(`País com ID ${id} não encontrado`)
    }

    return pais
  }

  async update(id: number, updatePaisDto: UpdatePaisDto): Promise<Pais> {
    const pais = await this.findOne(id)
    this.paisesRepository.merge(pais, updatePaisDto)
    return this.paisesRepository.save(pais)
  }

  async remove(id: number): Promise<void> {
    const pais = await this.findOne(id)
    await this.paisesRepository.remove(pais)
  }
}

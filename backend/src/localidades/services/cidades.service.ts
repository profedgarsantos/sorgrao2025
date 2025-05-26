import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Cidade } from "../entities/cidade.entity"
import { CreateCidadeDto } from "../dto/create-cidade.dto"
import { UpdateCidadeDto } from "../dto/update-cidade.dto"

@Injectable()
export class CidadesService {
  constructor(
    @InjectRepository(Cidade) private cidadesRepository: Repository<Cidade>,
  ) {}

  async create(createCidadeDto: CreateCidadeDto): Promise<Cidade> {
    const cidade = this.cidadesRepository.create(createCidadeDto)
    return this.cidadesRepository.save(cidade)
  }

  async findAll(estadoId?: number): Promise<Cidade[]> {
    if (estadoId) {
      return this.cidadesRepository.find({
        where: { estados_id: estadoId }, // Corrected: estado_id to estados_id
        relations: ["estado", "estado.pais"],
        order: { nome: "ASC" },
      })
    }
    return this.cidadesRepository.find({
      relations: ["estado", "estado.pais"],
      order: { nome: "ASC" },
    })
  }

  async findOne(id: number): Promise<Cidade> {
    const cidade = await this.cidadesRepository.findOne({
      where: { id },
      relations: ["estado", "estado.pais"],
    })

    if (!cidade) {
      throw new NotFoundException(`Cidade com ID ${id} não encontrada`)
    }

    return cidade
  }

  async update(id: number, updateCidadeDto: UpdateCidadeDto): Promise<Cidade> {
    const cidade = await this.findOne(id)
    this.cidadesRepository.merge(cidade, updateCidadeDto)
    return this.cidadesRepository.save(cidade)
  }

  async remove(id: number): Promise<void> {
    const cidade = await this.findOne(id)
    await this.cidadesRepository.remove(cidade)
  }
}

import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Motorista } from "./entities/motorista.entity"
import { CreateMotoristaDto } from "./dto/create-motorista.dto"
import { UpdateMotoristaDto } from "./dto/update-motorista.dto"

@Injectable()
export class MotoristasService {
  constructor(
    @InjectRepository(Motorista)
    private motoristasRepository: Repository<Motorista>,
  ) {}

  async create(createMotoristaDto: CreateMotoristaDto): Promise<Motorista> {
    const motorista = this.motoristasRepository.create(createMotoristaDto)
    return this.motoristasRepository.save(motorista)
  }

  async findAll(transportadoraId?: number): Promise<Motorista[]> {
    if (transportadoraId) {
      return this.motoristasRepository.find({
        where: { transportadora_id: transportadoraId },
        relations: ["transportadora"],
        order: { nome: "ASC" },
      })
    }
    return this.motoristasRepository.find({
      relations: ["transportadora"],
      order: { nome: "ASC" },
    })
  }

  async findOne(id: number): Promise<Motorista> {
    const motorista = await this.motoristasRepository.findOne({
      where: { id },
      relations: ["transportadora"],
    })

    if (!motorista) {
      throw new NotFoundException(`Motorista com ID ${id} não encontrado`)
    }

    return motorista
  }

  async update(id: number, updateMotoristaDto: UpdateMotoristaDto): Promise<Motorista> {
    const motorista = await this.findOne(id)
    this.motoristasRepository.merge(motorista, updateMotoristaDto)
    return this.motoristasRepository.save(motorista)
  }

  async remove(id: number): Promise<void> {
    const motorista = await this.findOne(id)
    await this.motoristasRepository.remove(motorista)
  }
}

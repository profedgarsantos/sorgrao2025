import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Transportadora } from "./entities/transportadora.entity"
import { CreateTransportadoraDto } from "./dto/create-transportadora.dto"
import { UpdateTransportadoraDto } from "./dto/update-transportadora.dto"

@Injectable()
export class TransportadorasService {
  constructor(
    @InjectRepository(Transportadora)
    private transportadorasRepository: Repository<Transportadora>,
  ) {}

  async create(createTransportadoraDto: CreateTransportadoraDto): Promise<Transportadora> {
    const transportadora = this.transportadorasRepository.create(createTransportadoraDto)
    return this.transportadorasRepository.save(transportadora)
  }

  async findAll(cidadeId?: number): Promise<Transportadora[]> {
    if (cidadeId) {
      return this.transportadorasRepository.find({
        where: { cidade_id: cidadeId },
        relations: ["cidade", "cidade.estado", "cidade.estado.pais"],
        order: { nome: "ASC" },
      })
    }
    return this.transportadorasRepository.find({
      relations: ["cidade", "cidade.estado", "cidade.estado.pais"],
      order: { nome: "ASC" },
    })
  }

  async findOne(id: number): Promise<Transportadora> {
    const transportadora = await this.transportadorasRepository.findOne({
      where: { id },
      relations: ["cidade", "cidade.estado", "cidade.estado.pais"],
    })

    if (!transportadora) {
      throw new NotFoundException(`Transportadora com ID ${id} não encontrada`)
    }

    return transportadora
  }

  async update(id: number, updateTransportadoraDto: UpdateTransportadoraDto): Promise<Transportadora> {
    const transportadora = await this.findOne(id)
    this.transportadorasRepository.merge(transportadora, updateTransportadoraDto)
    return this.transportadorasRepository.save(transportadora)
  }

  async remove(id: number): Promise<void> {
    const transportadora = await this.findOne(id)
    await this.transportadorasRepository.remove(transportadora)
  }
}

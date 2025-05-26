import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Estado } from "../entities/estado.entity"
import { CreateEstadoDto } from "../dto/create-estado.dto"
import { UpdateEstadoDto } from "../dto/update-estado.dto"

@Injectable()
export class EstadosService {
  private readonly estadosRepository: Repository<Estado>

  constructor(
    @InjectRepository(Estado)
    estadosRepository: Repository<Estado>,
  ) {
    this.estadosRepository = estadosRepository;
  }

  async create(createEstadoDto: CreateEstadoDto): Promise<Estado> {
    const estado = this.estadosRepository.create(createEstadoDto)
    return this.estadosRepository.save(estado)
  }

  async findAll(paisId?: number): Promise<Estado[]> {
    if (paisId) {
      return this.estadosRepository.find({
        where: { pais_id: paisId },
        relations: ["pais"],
        order: { nome: "ASC" },
      })
    }
    return this.estadosRepository.find({
      relations: ["pais"],
      order: { nome: "ASC" },
    })
  }

  async findOne(id: number): Promise<Estado> {
    const estado = await this.estadosRepository.findOne({
      where: { id },
      relations: ["pais"],
    })

    if (!estado) {
      throw new NotFoundException(`Estado com ID ${id} não encontrado`)
    }

    return estado
  }

  async update(id: number, updateEstadoDto: UpdateEstadoDto): Promise<Estado> {
    const estado = await this.findOne(id)
    this.estadosRepository.merge(estado, updateEstadoDto)
    return this.estadosRepository.save(estado)
  }

  async remove(id: number): Promise<void> {
    const estado = await this.findOne(id)
    await this.estadosRepository.remove(estado)
  }
}

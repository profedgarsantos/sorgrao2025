import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Veiculo } from "./entities/veiculo.entity"
import { CreateVeiculoDto } from "./dto/create-veiculo.dto"
import { UpdateVeiculoDto } from "./dto/update-veiculo.dto"

@Injectable()
export class VeiculosService {
  private veiculosRepository: Repository<Veiculo>

  constructor(
    @InjectRepository(Veiculo)
    veiculosRepository: Repository<Veiculo>,
  ) {
    this.veiculosRepository = veiculosRepository;
  }

  async create(createVeiculoDto: CreateVeiculoDto): Promise<Veiculo> {
    const veiculo = this.veiculosRepository.create(createVeiculoDto)
    return this.veiculosRepository.save(veiculo)
  }

  async findAll(transportadoraId?: number): Promise<Veiculo[]> {
    if (transportadoraId) {
      return this.veiculosRepository.find({
        where: { transportadora_id: transportadoraId },
        relations: ["transportadora"],
        order: { placa: "ASC" },
      })
    }
    return this.veiculosRepository.find({
      relations: ["transportadora"],
      order: { placa: "ASC" },
    })
  }

  async findOne(id: number): Promise<Veiculo> {
    const veiculo = await this.veiculosRepository.findOne({
      where: { id },
      relations: ["transportadora"],
    })

    if (!veiculo) {
      throw new NotFoundException(`Veículo com ID ${id} não encontrado`)
    }

    return veiculo
  }

  async update(id: number, updateVeiculoDto: UpdateVeiculoDto): Promise<Veiculo> {
    const veiculo = await this.findOne(id)
    this.veiculosRepository.merge(veiculo, updateVeiculoDto)
    return this.veiculosRepository.save(veiculo)
  }

  async remove(id: number): Promise<void> {
    const veiculo = await this.findOne(id)
    await this.veiculosRepository.remove(veiculo)
  }
}

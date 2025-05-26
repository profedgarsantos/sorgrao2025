import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { CreateEmpresaDto } from "./dto/create-empresa.dto"
import { UpdateEmpresaDto } from "./dto/update-empresa.dto"
import { Empresa } from "./entities/empresa.entity"

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private empresasRepository: Repository<Empresa>,
  ) { }

  async create(createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
    const empresa = this.empresasRepository.create(createEmpresaDto)
    return this.empresasRepository.save(empresa)
  }

  async findAll(): Promise<Empresa[]> {
    return this.empresasRepository.find({
      relations: ["cidade"],
    })
  }

  async findOne(id: number): Promise<Empresa> {
    const empresa = await this.empresasRepository.findOne({
      where: { id },
      relations: ["cidade"],
    })

    if (!empresa) {
      throw new NotFoundException(`Empresa com ID ${id} não encontrada`)
    }

    return empresa
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto): Promise<Empresa> {
    const empresa = await this.findOne(id)
    this.empresasRepository.merge(empresa, updateEmpresaDto)
    return this.empresasRepository.save(empresa)
  }

  async remove(id: number): Promise<void> {
    const empresa = await this.findOne(id)
    await this.empresasRepository.remove(empresa)
  }
}

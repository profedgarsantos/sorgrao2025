import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Comprador } from "./entities/comprador.entity"
import { CreateCompradorDto } from "./dto/create-comprador.dto"
import { UpdateCompradorDto } from "./dto/update-comprador.dto"

@Injectable()
export class CompradoresService {
  constructor(
    @InjectRepository(Comprador)
    private readonly compradoresRepository: Repository<Comprador>,
  ) {}

  async create(createCompradorDto: CreateCompradorDto): Promise<Comprador> {
    const comprador = this.compradoresRepository.create(createCompradorDto);
    return this.compradoresRepository.save(comprador);
  }

  async findAll(cidadeId?: number): Promise<Comprador[]> {
    const findOptions: any = {
      relations: ["cidade", "usuario", "empresa"], // Added usuario and empresa based on entity
      order: { nome: "ASC" },
    };
    if (cidadeId) {
      findOptions.where = { cidade_id: cidadeId };
    }
    return this.compradoresRepository.find(findOptions);
  }

  async findOne(id: number): Promise<Comprador> {
    const comprador = await this.compradoresRepository.findOne({
      where: { id },
      relations: ["cidade", "usuario", "empresa"], // Added usuario and empresa
    })

    if (!comprador) {
      throw new NotFoundException(`Comprador com ID ${id} não encontrado`)
    }

    return comprador
  }

  async update(id: number, updateCompradorDto: UpdateCompradorDto): Promise<Comprador> {
    const comprador = await this.findOne(id)
    this.compradoresRepository.merge(comprador, updateCompradorDto)
    return this.compradoresRepository.save(comprador)
  }

  async remove(id: number): Promise<void> {
    const comprador = await this.findOne(id)
    await this.compradoresRepository.remove(comprador)
  }
}

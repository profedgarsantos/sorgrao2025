import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Grupo } from "src/users/entities/grupo.entity";
import { Repository } from "typeorm"
import { CreateGrupoDto } from "./dto/create-grupo.dto";
import { UpdateGrupoDto } from "./dto/update-grupo.dto";


@Injectable()
export class GruposService {
  constructor(
    @InjectRepository(Grupo)
    private readonly gruposRepository: Repository<Grupo>,
  ) {}

  async create(createGrupoDto: CreateGrupoDto): Promise<Grupo> {
    const Grupo = this.gruposRepository.create(createGrupoDto);
    return this.gruposRepository.save(Grupo);
  }

  async findAll(cidadeId?: number): Promise<Grupo[]> {
    const findOptions: any = {
      relations: ["cidade", "usuario", "empresa"], // Added usuario and empresa based on entity
      order: { nome: "ASC" },
    };
    if (cidadeId) {
      findOptions.where = { cidade_id: cidadeId };
    }
    return this.gruposRepository.find(findOptions);
  }

  async findOne(id: number): Promise<Grupo> {
    const Grupo = await this.gruposRepository.findOne({
      where: { id },
      relations: ["cidade", "usuario", "empresa"], // Added usuario and empresa
    })

    if (!Grupo) {
      throw new NotFoundException(`Grupo com ID ${id} não encontrado`)
    }

    return Grupo
  }

  async update(id: number, updateGrupoDto: UpdateGrupoDto): Promise<Grupo> {
    const Grupo = await this.findOne(id)
    this.gruposRepository.merge(Grupo, updateGrupoDto)
    return this.gruposRepository.save(Grupo)
  }

  async remove(id: number): Promise<void> {
    const Grupo = await this.findOne(id)
    await this.gruposRepository.remove(Grupo)
  }
}

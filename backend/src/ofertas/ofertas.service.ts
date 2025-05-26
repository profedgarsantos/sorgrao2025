import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { type Repository, MoreThanOrEqual } from "typeorm"
import { CreateOfertaDto } from "./dto/create-oferta.dto"
import { UpdateOfertaDto } from "./dto/update-oferta.dto"
import { Oferta } from "./entities/oferta.entity"

@Injectable()
export class OfertasService {
  constructor(
    @InjectRepository(Oferta)
    private ofertasRepository: Repository<Oferta>,
  ) { }

  async create(createOfertaDto: CreateOfertaDto): Promise<Oferta> {
    const oferta = this.ofertasRepository.create(createOfertaDto)
    return this.ofertasRepository.save(oferta)
  }

  async findAll(empresaId?: number): Promise<Oferta[]> {
    const where = empresaId ? { empresas_id: empresaId } : {}
    return this.ofertasRepository.find({
      where,
      relations: ["vendedor", "vendedor.usuario", "produto", "empresa"],
    })
  }

  async findAtivas(empresaId?: number): Promise<Oferta[]> {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const where: any = {
      cancelado: false,
      validade: MoreThanOrEqual(today),
    }

    if (empresaId) {
      where.empresas_id = empresaId
    }

    return this.ofertasRepository.find({
      where,
      relations: ["vendedor", "vendedor.usuario", "produto", "empresa"],
    })
  }

  async findOne(id: number): Promise<Oferta> {
    const oferta = await this.ofertasRepository.findOne({
      where: { id },
      relations: ["vendedor", "vendedor.usuario", "produto", "empresa"],
    })

    if (!oferta) {
      throw new NotFoundException(`Oferta com ID ${id} não encontrada`)
    }

    return oferta
  }

  async update(id: number, updateOfertaDto: UpdateOfertaDto): Promise<Oferta> {
    const oferta = await this.findOne(id)
    this.ofertasRepository.merge(oferta, updateOfertaDto)
    return this.ofertasRepository.save(oferta)
  }

  async remove(id: number): Promise<void> {
    const oferta = await this.findOne(id)
    await this.ofertasRepository.remove(oferta)
  }

  async cancelar(id: number): Promise<Oferta> {
    const oferta = await this.findOne(id)
    oferta.cancelado = true
    return this.ofertasRepository.save(oferta)
  }
}

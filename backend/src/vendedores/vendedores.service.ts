import { Injectable, NotFoundException } from "@nestjs/common"
import { Repository } from "typeorm"
import { CreateVendedorDto } from "./dto/create-vendedor.dto"
import { UpdateVendedorDto } from "./dto/update-vendedor.dto"
import { Vendedor } from "./entities/vendedor.entity"
import { InjectRepository } from "@nestjs/typeorm"

@Injectable()
export class VendedoresService {

    constructor(
      @InjectRepository(Vendedor)
      private readonly vendedoresRepository: Repository<Vendedor>, // Injected directly
    ) {}

  async create(createVendedorDto: CreateVendedorDto): Promise<Vendedor> {
    const vendedor = this.vendedoresRepository.create(createVendedorDto)
    return this.vendedoresRepository.save(vendedor)
  }

  async findByEmpresa(empresaId: number): Promise<Vendedor[]> {
    return this.vendedoresRepository.find({
      where: { empresas_id: empresaId },
      relations: ["usuario", "funrural"],
    })
  }

  async findByUsuarioAndEmpresa(usuarioId: number, empresaId: number): Promise<Vendedor> {
    const vendedor = await this.vendedoresRepository.findOne({
      where: { usuario_id: usuarioId, empresas_id: empresaId },
      relations: ["usuario", "funrural"],
    })

    if (!vendedor) {
      throw new NotFoundException(`Vendedor não encontrado para o usuário ${usuarioId} na empresa ${empresaId}`)
    }

    return vendedor
  }

  async findByIdAndEmpresa(id: number, empresaId: number): Promise<Vendedor> {
    const vendedor = await this.vendedoresRepository.findOne({
      where: { id, empresas_id: empresaId },
      relations: ["usuario", "funrural"],
    })

    if (!vendedor) {
      throw new NotFoundException(`Vendedor com ID ${id} não encontrado na empresa ${empresaId}`)
    }

    return vendedor
  }

  async findByIdAndUsuarioAndEmpresa(id: number, usuarioId: number, empresaId: number): Promise<Vendedor> {
    const vendedor = await this.vendedoresRepository.findOne({
      where: { id, usuario_id: usuarioId, empresas_id: empresaId },
      relations: ["usuario", "funrural"],
    })

    if (!vendedor) {
      throw new NotFoundException(
        `Vendedor com ID ${id} não encontrado para o usuário ${usuarioId} na empresa ${empresaId}`,
      )
    }

    return vendedor
  }

  async update(id: number, empresaId: number, updateVendedorDto: UpdateVendedorDto): Promise<Vendedor> {
    const vendedor = await this.findByIdAndEmpresa(id, empresaId)
    this.vendedoresRepository.merge(vendedor, updateVendedorDto)
    return this.vendedoresRepository.save(vendedor)
  }

  async remove(id: number, empresaId: number): Promise<void> {
    const vendedor = await this.findByIdAndEmpresa(id, empresaId)
    await this.vendedoresRepository.remove(vendedor)
  }
}

import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { type Repository, Between, MoreThanOrEqual, LessThanOrEqual } from "typeorm"
import { Comissionado } from "./entities/comissionado.entity"
import { CreateComissionadoDto } from "./dto/create-comissionado.dto"
import { UpdateComissionadoDto } from "./dto/update-comissionado.dto"

interface FindAllParams {
  vendedorId?: number // This will map to usuario_id in the entity
  dataInicio?: string
  dataFim?: string
  status?: string
}

@Injectable()
export class ComissionadosService {
  // private comissionadosRepository: Repository<Comissionado> // TypeORM handles this
  constructor(
    @InjectRepository(Comissionado)
    private readonly comissionadosRepository: Repository<Comissionado>, // Injected directly
  ) {
    // this.comissionadosRepository = comissionadosRepository // No longer needed
  }

  async create(createComissionadoDto: CreateComissionadoDto): Promise<Comissionado> {
    const { vendedor_id, ...restOfDto } = createComissionadoDto;
    const comissionadoData = {
      ...restOfDto,
      usuario_id: vendedor_id, // Map vendedor_id to usuario_id
      data: new Date(createComissionadoDto.data), // Convert string date to Date object
    };
    const comissionado = this.comissionadosRepository.create(comissionadoData);
    return this.comissionadosRepository.save(comissionado);
  }

  async findAll(params: FindAllParams): Promise<Comissionado[]> {
    const { vendedorId, dataInicio, dataFim, status } = params

    const where: any = {}

    if (vendedorId) {
      where.usuario_id = vendedorId // Use usuario_id for filtering
    }

    if (status) {
      where.status = status
    }

    if (dataInicio && dataFim) {
      where.data = Between(new Date(dataInicio), new Date(dataFim))
    } else if (dataInicio) {
      where.data = MoreThanOrEqual(new Date(dataInicio))
    } else if (dataFim) {
      where.data = LessThanOrEqual(new Date(dataFim))
    }

    return this.comissionadosRepository.find({
      where,
      relations: ["usuario", "empresa"], // "vendedor" is "usuario", "operacao" is not in entity
      order: { data: "DESC" },
    })
  }

  async findOne(id: number): Promise<Comissionado> {
    const comissionado = await this.comissionadosRepository.findOne({
      where: { id },
      relations: ["usuario", "empresa"], // "vendedor" is "usuario", "operacao" is not in entity
    })

    if (!comissionado) {
      throw new NotFoundException(`Comissionamento com ID ${id} não encontrado`)
    }

    return comissionado
  }

  async update(id: number, updateComissionadoDto: UpdateComissionadoDto): Promise<Comissionado> {
    const comissionado = await this.findOne(id);
    const { vendedor_id, data, ...restOfDto } = updateComissionadoDto;

    const updateData: Partial<Comissionado> = { ...restOfDto };
    if (vendedor_id !== undefined) {
      updateData.usuario_id = vendedor_id;
    }
    if (data !== undefined) {
      updateData.data = new Date(data);
    }

    this.comissionadosRepository.merge(comissionado, updateData);
    return this.comissionadosRepository.save(comissionado);
  }

  async remove(id: number): Promise<void> {
    const comissionado = await this.findOne(id)
    await this.comissionadosRepository.remove(comissionado)
  }

  async getRelatorio(dataInicio?: string, dataFim?: string, vendedorId?: number) {
    const comissionados = await this.findAll({
      vendedorId, // This is actually usuarioId for the query
      dataInicio,
      dataFim,
      status: "pago",
    })

    const totalComissoes = comissionados.reduce((total, item) => total + Number(item.valor), 0)
    const totalOperacoes = comissionados.length

    // Agrupar por vendedor (usuario)
    const porVendedor = comissionados.reduce((acc, item) => {
      const usuarioId = item.usuario_id // Use usuario_id from entity
      if (!acc[usuarioId]) {
        acc[usuarioId] = {
          vendedor: item.usuario, // Use usuario from entity (which is the User object)
          total: 0,
          operacoes: 0,
        }
      }
      acc[usuarioId].total += Number(item.valor)
      acc[usuarioId].operacoes += 1
      return acc
    }, {})

    return {
      periodo: {
        inicio: dataInicio,
        fim: dataFim,
      },
      totalComissoes,
      totalOperacoes,
      porVendedor: Object.values(porVendedor),
    }
  }

  async getComissoesByVendedor(dataInicio?: string, dataFim?: string, vendedorId?: number) {
    const comissionados = await this.findAll({
      vendedorId, // This is actually usuarioId for the query
      dataInicio,
      dataFim,
    })

    // Agrupar por status
    const porStatus = comissionados.reduce((acc, item) => {
      const status = item.status // status is now a direct property of Comissionado
      if (!acc[status]) {
        acc[status] = {
          status,
          total: 0,
          operacoes: 0,
        }
      }
      acc[status].total += Number(item.valor) // valor is now a direct property
      acc[status].operacoes += 1
      return acc
    }, {})

    // Calcular totais
    const totalPago = porStatus["pago"] ? porStatus["pago"].total : 0
    const totalPendente = porStatus["pendente"] ? porStatus["pendente"].total : 0
    const totalGeral = totalPago + totalPendente

    return {
      periodo: {
        inicio: dataInicio,
        fim: dataFim,
      },
      totalPago,
      totalPendente,
      totalGeral,
      detalhamento: comissionados,
    }
  }
}

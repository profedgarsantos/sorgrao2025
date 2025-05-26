import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Produto } from "./entities/produto.entity"
import { CreateProdutoDto } from "./dto/create-produto.dto"
import { UpdateProdutoDto } from "./dto/update-produto.dto"

@Injectable()
export class ProdutosService {
  constructor(
    @InjectRepository(Produto)
    private produtosRepository: Repository<Produto>,
  ) {}

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const produto = this.produtosRepository.create(createProdutoDto)
    return this.produtosRepository.save(produto)
  }

  async findAll(tipo?: string): Promise<Produto[]> {
    if (tipo) {
      // Assuming 'tipo' parameter is intended to filter by the 'nome' field.
      // If it's for 'tipounidade', change 'nome' to 'tipounidade' below.
      return this.produtosRepository.find({
        where: { nome: tipo }, // Changed 'tipo' to 'nome: tipo'
        order: { nome: "ASC" },
      })
    }
    return this.produtosRepository.find({
      order: { nome: "ASC" },
    })
  }

  async findOne(id: number): Promise<Produto> {
    const produto = await this.produtosRepository.findOne({
      where: { id },
    })

    if (!produto) {
      throw new NotFoundException(`Produto com ID ${id} não encontrado`)
    }

    return produto
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    const produto = await this.findOne(id)
    this.produtosRepository.merge(produto, updateProdutoDto)
    return this.produtosRepository.save(produto)
  }

  async remove(id: number): Promise<void> {
    const produto = await this.findOne(id)
    await this.produtosRepository.remove(produto)
  }
}

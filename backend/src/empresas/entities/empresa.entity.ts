import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Cidade } from "../../localidades/entities/cidade.entity"
import { User } from "../../users/entities/user.entity"
import { Vendedor } from "../../vendedores/entities/vendedor.entity"
import { Comissionado } from "../../comissionados/entities/comissionado.entity"
import { Comprador } from "../../compradores/entities/comprador.entity"
import { Produto } from "../../produtos/entities/produto.entity"
import { Oferta } from "../../ofertas/entities/oferta.entity"
import { Demanda } from "../../demandas/entities/demanda.entity"
import { Fechamento } from "../../fechamentos/entities/fechamento.entity"

@Entity("empresas")
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string

  @Column()
  email: string

  @Column({ nullable: true })
  logradouro: string

  @Column({ nullable: true })
  numero: string

  @Column({ nullable: true })
  telefone: string

  @Column({ nullable: true })
  celular: string

  @Column({ name: "cidades_id" })
  cidades_id: number

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: "cidades_id" })
  cidade: Cidade

  @OneToMany(
    () => User,
    (user) => user.empresa,
  )
  usuarios: User[]

  @OneToMany(
    () => Vendedor,
    (vendedor) => vendedor.empresa,
  )
  vendedores: Vendedor[]

  @OneToMany(
    () => Comissionado,
    (comissionado) => comissionado.empresa,
  )
  comissionados: Comissionado[]

  @OneToMany(
    () => Comprador,
    (comprador) => comprador.empresa,
  )
  compradores: Comprador[]

  @OneToMany(
    () => Produto,
    (produto) => produto.empresa,
  )
  produtos: Produto[]

  @OneToMany(
    () => Oferta,
    (oferta) => oferta.empresa,
  )
  ofertas: Oferta[]

  @OneToMany(
    () => Demanda,
    (demanda) => demanda.empresa,
  )
  demandas: Demanda[]

  @OneToMany(
    () => Fechamento,
    (fechamento) => fechamento.empresa,
  )
  fechamentos: Fechamento[]
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm"
import { Comprador } from "../../compradores/entities/comprador.entity"
import { Empresa } from "../../empresas/entities/empresa.entity"
import { Produto } from "../../produtos/entities/produto.entity"
import { Fechamento } from "../../fechamentos/entities/fechamento.entity"

@Entity("demandas")
export class Demanda {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  quantidade: number

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  valorunitario: number

  @Column({ type: "date", nullable: true })
  validade: Date

  @Column({ nullable: true })
  finalizado: boolean

  @Column({ nullable: true })
  capacidaderecepcao: number

  @Column({ default: false })
  cancelado: boolean

  @Column({ name: "produtos_id" })
  produtos_id: number

  @ManyToOne(
    () => Produto,
    (produto) => produto.demandas,
  )
  @JoinColumn({ name: "produtos_id" })
  produto: Produto

  @Column({ name: "compradores_id" })
  compradores_id: number

  @ManyToOne(
    () => Comprador,
    (comprador) => comprador.demandas,
  )
  @JoinColumn({ name: "compradores_id" })
  comprador: Comprador

  @Column({ name: "empresas_id", default: 1 })
  empresas_id: number

  @ManyToOne(
    () => Empresa,
    (empresa) => empresa.demandas,
  )
  @JoinColumn({ name: "empresas_id" })
  empresa: Empresa

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date

  @OneToMany(
    () => Fechamento,
    (fechamento) => fechamento.demanda,
  )
  fechamentos: Fechamento[]
}

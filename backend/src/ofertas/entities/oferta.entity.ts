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
import { Vendedor } from "../../vendedores/entities/vendedor.entity"
import { Empresa } from "../../empresas/entities/empresa.entity"
import { Produto } from "../../produtos/entities/produto.entity"
import { Fechamento } from "../../fechamentos/entities/fechamento.entity"

@Entity("ofertas")
export class Oferta {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  quantidade: number

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  valorunitario: number

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  valorunitariorevenda: number

  @Column({ type: "date", nullable: true })
  validade: Date

  @Column({ nullable: true })
  distanciavendedor: number

  @Column({ default: false })
  cancelado: boolean

  @Column({ nullable: true })
  tipoentrega: string

  @Column({ nullable: true })
  capacidadeexpedicao: number

  @Column({ name: "vendedores_id" })
  vendedores_id: number

  @ManyToOne(
    () => Vendedor,
    (vendedor) => vendedor.ofertas,
  )
  @JoinColumn({ name: "vendedores_id" })
  vendedor: Vendedor

  @Column({ name: "empresas_id", default: 1 })
  empresas_id: number

  @ManyToOne(
    () => Empresa,
    (empresa) => empresa.ofertas,
  )
  @JoinColumn({ name: "empresas_id" })
  empresa: Empresa

  @Column({ name: "produtos_id" })
  produtos_id: number

  @ManyToOne(() => Produto)
  @JoinColumn({ name: "produtos_id" })
  produto: Produto

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date

  @OneToMany(
    () => Fechamento,
    (fechamento) => fechamento.oferta,
  )
  fechamentos: Fechamento[]
}

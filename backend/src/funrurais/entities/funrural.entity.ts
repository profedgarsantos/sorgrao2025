import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Empresa } from "../../empresas/entities/empresa.entity"
import { Vendedor } from "../../vendedores/entities/vendedor.entity"

@Entity("funrurals")
export class Funrural {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  descricao: string

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  valor: number

  @Column({ name: "empresas_id", default: 1 })
  empresas_id: number

  @ManyToOne(() => Empresa)
  @JoinColumn({ name: "empresas_id" })
  empresa: Empresa

  @OneToMany(
    () => Vendedor,
    (vendedor) => vendedor.funrural,
  )
  vendedores: Vendedor[]
}

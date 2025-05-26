import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "../../users/entities/user.entity"
import { Empresa } from "../../empresas/entities/empresa.entity"
import { Demanda } from "../../demandas/entities/demanda.entity"
import { Cidade } from "../../localidades/entities/cidade.entity" // Assuming Cidade entity path

@Entity("compradores")
export class Comprador {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 255 })
  nome: string

  @Column({ type: "varchar", length: 255, nullable: true })
  razao_social?: string

  @Column({ type: "varchar", length: 20, nullable: true })
  cpf_cnpj?: string

  @Column({ type: "varchar", length: 20, nullable: true })
  inscricao_estadual?: string

  @Column({ type: "varchar", length: 20, nullable: true })
  telefone?: string

  @Column({ type: "varchar", length: 255, nullable: true })
  email?: string

  @Column({ type: "text", nullable: true })
  endereco?: string

  @Column({ name: "cidade_id", nullable: true })
  cidade_id?: number

  @ManyToOne(() => Cidade, { nullable: true }) // Added relation to Cidade
  @JoinColumn({ name: "cidade_id" })
  cidade?: Cidade

  @Column({ name: "empresas_id", default: 1 })
  empresas_id: number

  @ManyToOne(
    () => Empresa,
    (empresa) => empresa.compradores,
  )
  @JoinColumn({ name: "empresas_id" })
  empresa: Empresa

  @Column({ name: "usuario_id" })
  usuario_id: number

  @ManyToOne(
    () => User,
    (user) => user.compradores,
  )
  @JoinColumn({ name: "usuario_id" })
  usuario: User

  @OneToMany(
    () => Demanda,
    (demanda) => demanda.comprador,
  )
  demandas: Demanda[]

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date
}

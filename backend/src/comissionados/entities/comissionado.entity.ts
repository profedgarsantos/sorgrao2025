import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { User } from "../../users/entities/user.entity"
import { Empresa } from "../../empresas/entities/empresa.entity"

@Entity("comissionados")
export class Comissionado {
  @PrimaryGeneratedColumn()
  id: number

  // Fields from DTO / service logic
  @Column({ type: "decimal", precision: 10, scale: 2 })
  valor: number

  @Column({ type: "decimal", precision: 5, scale: 2 })
  percentual: number

  @Column({ type: "date" })
  data: Date

  @Column({ type: "varchar", length: 20, default: "pendente" }) // e.g., pendente, pago, cancelado
  status: string

  @Column({ nullable: true })
  operacao_id?: number

  @Column({ type: "varchar", length: 50, nullable: true })
  operacao_tipo?: string // e.g., venda, compra, frete, outro

  @Column({ type: "text", nullable: true })
  observacao?: string

  // Existing fields (bank details, user link)
  @Column({ nullable: true })
  nomebanco: string

  @Column({ nullable: true })
  numerobanco: number

  @Column({ nullable: true })
  agencia: string

  @Column({ nullable: true })
  contacorrente: string

  @Column({ name: "usuario_id" }) // This corresponds to vendedor_id in DTO
  usuario_id: number

  @ManyToOne(
    () => User,
    (user) => user.comissionados,
  )
  @JoinColumn({ name: "usuario_id" })
  usuario: User // This corresponds to vendedor in service logic

  @Column({ name: "empresas_id", default: 1 })
  empresas_id: number

  @ManyToOne(
    () => Empresa,
    (empresa) => empresa.comissionados,
  )
  @JoinColumn({ name: "empresas_id" })
  empresa: Empresa

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date
}

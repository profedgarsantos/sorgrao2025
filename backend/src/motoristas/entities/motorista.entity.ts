import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Transportadora } from "../../transportadoras/entities/transportadora.entity"

@Entity("motoristas")
export class Motorista {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string

  @Column({ nullable: true })
  cpf: string

  @Column({ nullable: true })
  cnh: string

  @Column({ nullable: true })
  telefone: string

  @Column({ nullable: true })
  transportadora_id: number

  @ManyToOne(
    () => Transportadora,
    (transportadora) => transportadora.motoristas,
  )
  @JoinColumn({ name: "transportadora_id" })
  transportadora: Transportadora

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date
}

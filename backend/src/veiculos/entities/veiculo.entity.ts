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

@Entity("veiculos")
export class Veiculo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  placa: string

  @Column({ nullable: true })
  modelo: string

  @Column({ nullable: true })
  tipo: string

  @Column({ nullable: true })
  capacidade: number

  @Column({ nullable: true })
  ano: number

  @Column({ nullable: true })
  transportadora_id: number

  @ManyToOne(
    () => Transportadora,
    (transportadora) => transportadora.veiculos,
  )
  @JoinColumn({ name: "transportadora_id" })
  transportadora: Transportadora

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date
}

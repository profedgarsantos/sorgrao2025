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
import { Cidade } from "../../localidades/entities/cidade.entity"
import { Motorista } from "../../motoristas/entities/motorista.entity"
import { Veiculo } from "../../veiculos/entities/veiculo.entity"

@Entity("transportadoras")
export class Transportadora {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string

  @Column({ nullable: true })
  cnpj: string

  @Column({ nullable: true })
  endereco: string

  @Column({ nullable: true })
  telefone: string

  @Column({ nullable: true })
  email: string

  @Column({ nullable: true })
  cidade_id: number

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: "cidade_id" })
  cidade: Cidade

  @OneToMany(
    () => Motorista,
    (motorista) => motorista.transportadora,
  )
  motoristas: Motorista[]

  @OneToMany(
    () => Veiculo,
    (veiculo) => veiculo.transportadora,
  )
  veiculos: Veiculo[]

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date
}

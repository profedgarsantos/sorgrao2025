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
import { TipoFrete } from "../../produtos/entities/tipo-frete.entity"
import { Motorista } from "../../motoristas/entities/motorista.entity"
import { Veiculo } from "../../veiculos/entities/veiculo.entity"
import { Cidade } from "../../localidades/entities/cidade.entity"

@Entity({ name: "fretes" })
export class Frete {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "distanciainicial", nullable: true })
  distanciainicial: number

  @Column({ name: "distanciafinal", nullable: true })
  distanciafinal: number

  @Column({ name: "valorfrete", type: "decimal", precision: 10, scale: 2, nullable: true })
  valorfrete: number

  @Column({ name: "tiposfretes_id" })
  tiposfretes_id: number

  @Column({ nullable: true })
  transportadora_id: number

  @Column({ nullable: true })
  motorista_id: number

  @Column({ nullable: true })
  veiculo_id: number

  @Column({ nullable: true })
  origem_id: number

  @Column({ nullable: true })
  destino_id: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  valor: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  peso: number

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  distancia: number

  @Column({ nullable: true })
  status: string

  @Column({ type: "datetime", nullable: true })
  data_saida: Date

  @Column({ type: "datetime", nullable: true })
  data_chegada: Date

  @Column({ nullable: true })
  observacoes: string

  @ManyToOne(() => Transportadora)
  @JoinColumn({ name: "transportadora_id" })
  transportadora: Transportadora

  @ManyToOne(() => TipoFrete)
  @JoinColumn({ name: "tiposfretes_id" })
  tipo_frete: TipoFrete

  @ManyToOne(() => Motorista)
  @JoinColumn({ name: "motorista_id" })
  motorista: Motorista

  @ManyToOne(() => Veiculo)
  @JoinColumn({ name: "veiculo_id" })
  veiculo: Veiculo

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: "origem_id" })
  origem: Cidade

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: "destino_id" })
  destino: Cidade

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date
}

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm"
import { Oferta } from "../../ofertas/entities/oferta.entity"

@Entity({ name: "calculadora" })
export class Calculadora {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "comissionados_id" })
  comissionados_id: number

  @Column({ name: "valorfrete", type: "decimal", precision: 10, scale: 2 })
  valorfrete: number

  @Column({ name: "valorcomissionado", type: "decimal", precision: 10, scale: 2 })
  valorcomissionado: number

  @Column({ name: "valoroferta", type: "decimal", precision: 10, scale: 2 })
  valoroferta: number

  @Column({ name: "valorfunrural", type: "decimal", precision: 10, scale: 2 })
  valorfunrural: number

  @Column({ name: "valorfinal", type: "decimal", precision: 10, scale: 2 })
  valorfinal: number

  @Column({ name: "ofertas_id" })
  ofertas_id: number

  @ManyToOne(() => Oferta)
  @JoinColumn({ name: "ofertas_id" })
  oferta: Oferta

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date
}

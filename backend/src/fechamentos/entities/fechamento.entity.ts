import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm"
import { Oferta } from "../../ofertas/entities/oferta.entity"
import { Demanda } from "../../demandas/entities/demanda.entity"
import { Empresa } from "../../empresas/entities/empresa.entity"

@Entity("fechamentos")
export class Fechamento {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: "oferta_id" })
  oferta_id: number

  @ManyToOne(
    () => Oferta,
    (oferta) => oferta.fechamentos,
  )
  @JoinColumn({ name: "oferta_id" })
  oferta: Oferta

  @Column({ name: "demanda_id" })
  demanda_id: number

  @ManyToOne(
    () => Demanda,
    (demanda) => demanda.fechamentos,
  )
  @JoinColumn({ name: "demanda_id" })
  demanda: Demanda

  @Column({ name: "empresas_id", default: 1 })
  empresas_id: number

  @ManyToOne(
    () => Empresa,
    (empresa) => empresa.fechamentos,
  )
  @JoinColumn({ name: "empresas_id" })
  empresa: Empresa

  @Column({ nullable: true })
  quantidade: number

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  valorunitario: number

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  valorfinal: number

  @Column({ type: "date", nullable: true })
  inicioentrega: Date

  @Column({ type: "date", nullable: true })
  fimentrega: Date

  @Column({ default: 0 })
  comissionado_id: number

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: true })
  valorcomissionado: number

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date
}

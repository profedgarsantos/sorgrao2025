import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Empresa } from "../../empresas/entities/empresa.entity"
import { TipoFrete } from "./tipo-frete.entity"
import { Oferta } from "../../ofertas/entities/oferta.entity"
import { Demanda } from "../../demandas/entities/demanda.entity"

@Entity("produtos")
export class Produto {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  nome: string

  @Column()
  tipounidade: string

  @Column({ name: "empresas_id", default: 1 })
  empresas_id: number

  @ManyToOne(
    () => Empresa,
    (empresa) => empresa.produtos,
  )
  @JoinColumn({ name: "empresas_id" })
  empresa: Empresa

  @Column({ name: "tiposfretes_id", default: 1 })
  tiposfretes_id: number

  @ManyToOne(() => TipoFrete)
  @JoinColumn({ name: "tiposfretes_id" })
  tipofrete: TipoFrete

  @OneToMany(
    () => Oferta,
    (oferta) => oferta.produto,
  )
  ofertas: Oferta[]

  @OneToMany(
    () => Demanda,
    (demanda) => demanda.produto,
  )
  demandas: Demanda[]
}

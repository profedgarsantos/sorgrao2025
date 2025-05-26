import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { User } from "../../users/entities/user.entity"
import { Funrural } from "../../funrurais/entities/funrural.entity"
import { Empresa } from "../../empresas/entities/empresa.entity"
import { Oferta } from "../../ofertas/entities/oferta.entity"

@Entity("vendedores")
export class Vendedor {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: true })
  nomebanco: string

  @Column({ nullable: true })
  numerobanco: number

  @Column({ nullable: true })
  agencia: string

  @Column({ nullable: true })
  contacorrente: string

  @Column({ name: "usuario_id" })
  usuario_id: number

  @ManyToOne(
    () => User,
    (user) => user.vendedores,
  )
  @JoinColumn({ name: "usuario_id" })
  usuario: User

  @Column({ name: "funrural_id" })
  funrural_id: number

  @ManyToOne(() => Funrural)
  @JoinColumn({ name: "funrural_id" })
  funrural: Funrural

  @Column({ name: "empresas_id", default: 1 })
  empresas_id: number

  @ManyToOne(
    () => Empresa,
    (empresa) => empresa.vendedores,
  )
  @JoinColumn({ name: "empresas_id" })
  empresa: Empresa

  @OneToMany(
    () => Oferta,
    (oferta) => oferta.vendedor,
  )
  ofertas: Oferta[]
}

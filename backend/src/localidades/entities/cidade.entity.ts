import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Estado } from "./estado.entity"
import { Empresa } from "../../empresas/entities/empresa.entity"
import { User } from "../../users/entities/user.entity"

@Entity("cidades")
export class Cidade {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string

  @Column({ name: "estados_id" })
  estados_id: number

  @ManyToOne(
    () => Estado,
    (estado) => estado.cidades,
  )
  @JoinColumn({ name: "estados_id" })
  estado: Estado

  @OneToMany(
    () => Empresa,
    (empresa) => empresa.cidade,
  )
  empresas: Empresa[]

  @OneToMany(
    () => User,
    (user) => user.cidade,
  )
  usuarios: User[]
}

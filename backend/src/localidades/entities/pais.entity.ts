import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Estado } from "./estado.entity"

@Entity("paises")
export class Pais {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string

  @Column({ length: 2 })
  sigla: string

  @OneToMany(
    () => Estado,
    (estado) => estado.pais,
  )
  estados: Estado[]

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date
}

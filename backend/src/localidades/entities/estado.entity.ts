import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm"
import { Pais } from "./pais.entity"
import { Cidade } from "./cidade.entity"

@Entity("estados")
export class Estado {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string

  @Column({ length: 2 })
  uf: string

  @Column()
  pais_id: number

  @ManyToOne(
    () => Pais,
    (pais) => pais.estados,
  )
  @JoinColumn({ name: "pais_id" })
  pais: Pais

  @OneToMany(
    () => Cidade,
    (cidade) => cidade.estado,
  )
  cidades: Cidade[]

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date
}

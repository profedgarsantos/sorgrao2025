import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity("tipos_fretes")
export class TipoFrete {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string

  @Column({ nullable: true })
  descricao: string

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date
}

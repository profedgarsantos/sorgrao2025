import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("grupos")
export class Grupo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string
}

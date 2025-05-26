import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
@Entity("grupos")
export class Comprador {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", length: 255 })
  nome: string
}

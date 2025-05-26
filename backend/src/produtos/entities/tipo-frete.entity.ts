import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("tiposfretes")
export class TipoFrete {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string
}

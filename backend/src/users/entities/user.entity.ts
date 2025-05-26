import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm"
import { Exclude } from "class-transformer"
import { Cidade } from "../../localidades/entities/cidade.entity"
import { Empresa } from "../../empresas/entities/empresa.entity"
import { Grupo } from "./grupo.entity"
import { Vendedor } from "../../vendedores/entities/vendedor.entity"
import { Comissionado } from "../../comissionados/entities/comissionado.entity"
import { Comprador } from "../../compradores/entities/comprador.entity"

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column({ nullable: true })
  email_verified_at: Date

  @Column()
  @Exclude()
  password: string

  @Column({ nullable: true })
  cep: string

  @Column({ nullable: true })
  logradouro: string

  @Column({ nullable: true })
  bairro: string

  @Column({ nullable: true })
  numero: string

  @Column({ nullable: true })
  telefone: string

  @Column({ nullable: true })
  celular: string

  @Column({ nullable: true })
  cnpjcpf: string

  @Column({ nullable: true })
  inscricaoestadual: string

  @Column({ nullable: true })
  inscricaomunicipal: string

  @Column({ default: true })
  ativo: boolean

  @Column({ name: "cidades_id" })
  cidades_id: number

  @ManyToOne(() => Cidade)
  @JoinColumn({ name: "cidades_id" })
  cidade: Cidade

  @Column({ name: "grupos_id" })
  grupos_id: number

  @ManyToOne(() => Grupo)
  @JoinColumn({ name: "grupos_id" })
  grupo: Grupo

  @Column({ name: "empresas_id", default: 1 })
  empresas_id: number

  @ManyToOne(() => Empresa)
  @JoinColumn({ name: "empresas_id" })
  empresa: Empresa

  @Column({ nullable: true })
  remember_token: string

  @CreateDateColumn({ name: "created_at" })
  created_at: Date

  @UpdateDateColumn({ name: "updated_at" })
  updated_at: Date

  @OneToMany(
    () => Vendedor,
    (vendedor) => vendedor.usuario,
  )
  vendedores: Vendedor[]

  @OneToMany(
    () => Comissionado,
    (comissionado) => comissionado.usuario,
  )
  comissionados: Comissionado[]

  @OneToMany(
    () => Comprador,
    (comprador) => comprador.usuario,
  )
  compradores: Comprador[]
}

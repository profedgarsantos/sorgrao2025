import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Expedicao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', name: 'fechamento_id' })
  fechamentoId: number;

  @Column({ type: 'integer', name: 'motoristas_id' })
  motoristaId: number;

  @Column({ type: 'integer', name: 'veiculos_id' })
  veiculoId: number;

  @Column({ type: 'integer', name: 'produtos_id' })
  produtoId: number;

  @Column({ type: 'integer', name: 'empresas_id', default: 1 })
  empresaId: number;

  @Column({ type: 'date', nullable: true })
  disponibilidade: Date | null;

  @Column({ type: 'date', nullable: true })
  datasaida: Date | null;

  @Column({ type: 'tinyint', nullable: true })
  emrecepcao: boolean | null;

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date | null;
}

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

@Entity('avaliacoes')
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pessoa, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;

  @Column({ name: 'data_avaliacao', type: 'date', nullable: true })
  dataAvaliacao: string;

  @Column({ nullable: true, length: 100 })
  tipo: string;

  @Column({ nullable: true })
  descricao: string;

  @Column({ nullable: true })
  resultado: string;

  @Column({ name: 'proxima_avaliacao', type: 'date', nullable: true })
  proximaAvaliacao: string;

  @Column({ default: 'pendente', length: 20 })
  status: string;

  @Column({ nullable: true })
  observacoes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

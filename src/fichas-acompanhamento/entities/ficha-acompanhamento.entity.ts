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
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Entity('fichas_acompanhamento')
export class FichaAcompanhamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pessoa, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;

  @ManyToOne(() => Usuario, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ name: 'data_atendimento', type: 'date', nullable: true })
  dataAtendimento: string;

  @Column({ nullable: true, length: 100 })
  tipo: string;

  @Column({ nullable: true })
  descricao: string;

  @Column({ nullable: true })
  evolucao: string;

  @Column({ nullable: true })
  plano: string;

  @Column({ default: 'ativo', length: 20 })
  status: string;

  @Column({ nullable: true })
  observacoes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

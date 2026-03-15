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
import { Empresa } from '../../empresas/entities/empresa.entity';

@Entity('encaminhamentos')
export class Encaminhamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pessoa, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;

  @ManyToOne(() => Empresa, {
    eager: true,
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  @Column({ name: 'data_encaminhamento', type: 'date', nullable: true })
  dataEncaminhamento: string;

  @Column({ name: 'data_retorno', type: 'date', nullable: true })
  dataRetorno: string;

  @Column({ default: 'pendente', length: 20 })
  status: string;

  @Column({ nullable: true })
  observacoes: string;

  @Column({ nullable: true, length: 150 })
  cargo: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

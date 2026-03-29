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

export enum StatusEncaminhamento {
  ATIVO = 'ativo',
  DESLIGADO = 'desligado',
}

@Entity('encaminhamentos')
export class Encaminhamento {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pessoa, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;

  @ManyToOne(() => Empresa, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'empresa_id' })
  empresa: Empresa;

  @Column({ name: 'data_admissao', type: 'date', nullable: true })
  dataAdmissao: string;

  @Column({ nullable: true, length: 255 })
  funcao: string;

  @Column({ name: 'contato_rh', nullable: true, length: 255 })
  contatoRh: string;

  @Column({ name: 'data_provavel_desligamento', type: 'date', nullable: true })
  dataProvavelDesligamento: string;

  @Column({
    type: 'enum',
    enum: StatusEncaminhamento,
    default: StatusEncaminhamento.ATIVO,
  })
  status: StatusEncaminhamento;

  @Column({ type: 'text', nullable: true })
  observacoes: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

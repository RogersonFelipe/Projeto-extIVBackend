import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';
import { Empresa } from '../../empresas/entities/empresa.entity';

@Entity('fichas_acompanhamento')
export class FichaAcompanhamento {
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

  @Column({ name: 'data_visita', type: 'date', nullable: true })
  dataVisita: string;

  @Column({ name: 'contato_rh', nullable: true, length: 255 })
  contatoRh: string;

  @Column({ name: 'parecer_geral', type: 'text', nullable: true })
  parecerGeral: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

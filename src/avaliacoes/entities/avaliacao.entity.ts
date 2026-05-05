import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Pessoa } from '../../pessoas/entities/pessoa.entity';

export enum TipoAvaliacao {
  INICIAL = 'inicial',
  ACOMPANHAMENTO = 'acompanhamento',
}

export enum ResultadoControle {
  EM_ANDAMENTO = 'em-andamento',
  APROVADO = 'aprovado',
  REPROVADO = 'reprovado',
}

export enum StatusAvaliacao {
  EM_ABERTO = 'em_aberto',
  FINALIZADO = 'finalizado',
  CANCELADO = 'cancelado',
}

@Entity('avaliacoes')
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pessoa, { eager: true, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'pessoa_id' })
  pessoa: Pessoa;

  @Column({ name: 'data_avaliacao', type: 'date', nullable: true })
  dataAvaliacao: string;

  @Column({ type: 'enum', enum: TipoAvaliacao, nullable: true })
  tipo: TipoAvaliacao;

  @Column({ name: 'professor_responsavel', nullable: true, length: 255 })
  professorResponsavel: string;

  @Column({ name: 'data_ingresso', type: 'date', nullable: true })
  ingresso: string;

  @Column({ name: 'data_primeira_avaliacao', type: 'date', nullable: true })
  aval1: string;

  @Column({ name: 'data_segunda_avaliacao', type: 'date', nullable: true })
  aval2: string;

  @Column({ name: 'data_primeira_entrevista_pais', type: 'date', nullable: true })
  entrevistaPais1: string;

  @Column({ name: 'data_segunda_entrevista_pais', type: 'date', nullable: true })
  entrevistaPais2: string;

  @Column({
    name: 'resultado_controle',
    type: 'enum',
    enum: ResultadoControle,
    default: ResultadoControle.EM_ANDAMENTO,
  })
  resultado: ResultadoControle;

  @Column({ name: 'observacao_controle', type: 'text', nullable: true })
  observacao: string;

  @Column({
    name: 'status_avaliacao',
    type: 'enum',
    enum: StatusAvaliacao,
    default: StatusAvaliacao.EM_ABERTO,
  })
  statusAvaliacao: StatusAvaliacao;

  // ── Perguntas 01–46 (1=Sim, 2=Não, 3=Maioria das vezes, 4=Raras vezes) ──
  @Column({ type: 'smallint', nullable: true }) q01: number;
  @Column({ type: 'smallint', nullable: true }) q02: number;
  @Column({ type: 'smallint', nullable: true }) q03: number;
  @Column({ type: 'smallint', nullable: true }) q04: number;
  @Column({ type: 'smallint', nullable: true }) q05: number;
  @Column({ type: 'smallint', nullable: true }) q06: number;
  @Column({ type: 'smallint', nullable: true }) q07: number;
  @Column({ type: 'smallint', nullable: true }) q08: number;
  @Column({ type: 'smallint', nullable: true }) q09: number;
  @Column({ type: 'smallint', nullable: true }) q10: number;
  @Column({ type: 'smallint', nullable: true }) q11: number;
  @Column({ type: 'smallint', nullable: true }) q12: number;
  @Column({ type: 'smallint', nullable: true }) q13: number;
  @Column({ type: 'smallint', nullable: true }) q14: number;
  @Column({ type: 'smallint', nullable: true }) q15: number;
  @Column({ type: 'smallint', nullable: true }) q16: number;
  @Column({ type: 'smallint', nullable: true }) q17: number;
  @Column({ type: 'smallint', nullable: true }) q18: number;
  @Column({ type: 'smallint', nullable: true }) q19: number;
  @Column({ type: 'smallint', nullable: true }) q20: number;
  @Column({ type: 'smallint', nullable: true }) q21: number;
  @Column({ type: 'smallint', nullable: true }) q22: number;
  @Column({ type: 'smallint', nullable: true }) q23: number;
  @Column({ type: 'smallint', nullable: true }) q24: number;
  @Column({ type: 'smallint', nullable: true }) q25: number;
  @Column({ type: 'smallint', nullable: true }) q26: number;
  @Column({ type: 'smallint', nullable: true }) q27: number;
  @Column({ type: 'smallint', nullable: true }) q28: number;
  @Column({ type: 'smallint', nullable: true }) q29: number;
  @Column({ type: 'smallint', nullable: true }) q30: number;
  @Column({ type: 'smallint', nullable: true }) q31: number;
  @Column({ type: 'smallint', nullable: true }) q32: number;
  @Column({ type: 'smallint', nullable: true }) q33: number;
  @Column({ type: 'smallint', nullable: true }) q34: number;
  @Column({ type: 'smallint', nullable: true }) q35: number;
  @Column({ type: 'smallint', nullable: true }) q36: number;
  @Column({ type: 'smallint', nullable: true }) q37: number;
  @Column({ type: 'smallint', nullable: true }) q38: number;
  @Column({ type: 'smallint', nullable: true }) q39: number;
  @Column({ type: 'smallint', nullable: true }) q40: number;
  @Column({ type: 'smallint', nullable: true }) q41: number;
  @Column({ type: 'smallint', nullable: true }) q42: number;
  @Column({ type: 'smallint', nullable: true }) q43: number;
  @Column({ type: 'smallint', nullable: true }) q44: number;
  @Column({ type: 'smallint', nullable: true }) q45: number;
  @Column({ type: 'smallint', nullable: true }) q46: number;

  // ── Perguntas dissertativas ────────────────────────────────────────────────
  @Column({ nullable: true, length: 250 })
  q47: string; // Em sua opinião o usuário tem perfil para esta instituição? Por quê?

  @Column({ nullable: true, length: 250 })
  q48: string; // Em que situações demonstra irritações? (referente ao * de q12)

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

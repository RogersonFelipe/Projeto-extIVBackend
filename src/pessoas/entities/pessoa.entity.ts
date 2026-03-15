import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pessoas')
export class Pessoa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ name: 'foto_url', nullable: true })
  fotoUrl: string;

  @Column({ name: 'data_nascimento', type: 'date', nullable: true })
  dataNascimento: string;

  @Column({ name: 'data_entrada', type: 'date', nullable: true })
  dataEntrada: string;

  @Column({ default: 'ativo', length: 10 })
  status: string;

  @Column({ name: 'usa_medicamento', default: false })
  usaMedicamento: boolean;

  @Column({ name: 'info_medicamentos', nullable: true })
  infoMedicamentos: string;

  @Column({ nullable: true, length: 20 })
  telefone: string;

  @Column({ name: 'nome_responsavel', nullable: true, length: 150 })
  nomeResponsavel: string;

  @Column({ name: 'telefone_responsavel', nullable: true, length: 20 })
  telefoneResponsavel: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

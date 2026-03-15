import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('empresas')
export class Empresa {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  nome: string;

  @Column({ nullable: true, length: 20 })
  cnpj: string;

  @Column({ nullable: true, length: 200 })
  endereco: string;

  @Column({ nullable: true, length: 20 })
  telefone: string;

  @Column({ name: 'nome_contato', nullable: true, length: 150 })
  nomeContato: string;

  @Column({ name: 'email_contato', nullable: true, length: 150 })
  emailContato: string;

  @Column({ nullable: true })
  observacoes: string;

  @Column({ default: true })
  ativa: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

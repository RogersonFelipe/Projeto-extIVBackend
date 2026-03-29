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

  @Column({ name: 'nome_fantasia', nullable: true, length: 255 })
  nomeFantasia: string;

  @Column({ name: 'razao_social', nullable: true, length: 255 })
  razaoSocial: string;

  @Column({ nullable: true, length: 18, unique: true })
  cnpj: string;

  @Column({ nullable: true, length: 255 })
  endereco: string;

  @Column({ nullable: true, length: 20 })
  telefone: string;

  @Column({ name: 'contato_rh_nome', nullable: true, length: 255 })
  contatoRhNome: string;

  @Column({ name: 'contato_rh_email', nullable: true, length: 255 })
  contatoRhEmail: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

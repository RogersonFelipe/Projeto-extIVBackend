import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

export enum NivelAcesso {
  ADMIN = 'admin',
  USUARIO = 'usuario',
}

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nome: string;

  @Column({ unique: true, length: 150 })
  email: string;

  @Exclude()
  @Column({ name: 'senha_hash' })
  senhaHash: string;

  @Column({ name: 'foto_url', nullable: true })
  fotoUrl: string;

  @Column({ name: 'token_recuperacao', nullable: true })
  tokenRecuperacao: string;

  @Column({ name: 'validade_token', type: 'timestamp', nullable: true })
  validadeToken: Date;

  @Column({
    name: 'nivel_acesso',
    type: 'enum',
    enum: NivelAcesso,
    default: NivelAcesso.USUARIO,
  })
  nivelAcesso: NivelAcesso;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

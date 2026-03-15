import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepo: Repository<Usuario>,
  ) {}

  async create(dto: CreateUsuarioDto): Promise<Usuario> {
    const existe = await this.usuariosRepo.findOne({
      where: { email: dto.email },
    });
    if (existe) throw new ConflictException('E-mail já cadastrado');

    const senhaHash = await bcrypt.hash(dto.senha, 12);
    const usuario = this.usuariosRepo.create({
      nome: dto.nome,
      email: dto.email,
      senhaHash,
      nivelAcesso: dto.nivelAcesso,
    });
    return this.usuariosRepo.save(usuario);
  }

  findAll(): Promise<Usuario[]> {
    return this.usuariosRepo.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepo.findOne({ where: { id } });
    if (!usuario) throw new NotFoundException('Usuário não encontrado');
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuariosRepo.findOne({ where: { email } });
  }

  async update(id: number, dto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    if (dto.senha) {
      usuario.senhaHash = await bcrypt.hash(dto.senha, 12);
    }
    if (dto.nome) usuario.nome = dto.nome;
    if (dto.email) usuario.email = dto.email;
    if (dto.fotoUrl !== undefined) usuario.fotoUrl = dto.fotoUrl;
    return this.usuariosRepo.save(usuario);
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuariosRepo.remove(usuario);
  }
}

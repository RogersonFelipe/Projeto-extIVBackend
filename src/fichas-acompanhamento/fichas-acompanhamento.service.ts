import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FichaAcompanhamento } from './entities/ficha-acompanhamento.entity';
import type { Pessoa } from '../pessoas/entities/pessoa.entity';
import type { Usuario } from '../usuarios/entities/usuario.entity';
import { CreateFichaAcompanhamentoDto } from './dto/create-ficha-acompanhamento.dto';
import { UpdateFichaAcompanhamentoDto } from './dto/update-ficha-acompanhamento.dto';

@Injectable()
export class FichasAcompanhamentoService {
  constructor(
    @InjectRepository(FichaAcompanhamento)
    private readonly fichasRepo: Repository<FichaAcompanhamento>,
  ) {}

  create(dto: CreateFichaAcompanhamentoDto): Promise<FichaAcompanhamento> {
    const { pessoaId, usuarioId, ...rest } = dto;
    const ficha = this.fichasRepo.create({
      ...rest,
      pessoa: { id: pessoaId } as Pessoa,
      usuario: usuarioId ? ({ id: usuarioId } as Usuario) : undefined,
    });
    return this.fichasRepo.save(ficha);
  }

  findAll(): Promise<FichaAcompanhamento[]> {
    return this.fichasRepo.find({ order: { createdAt: 'DESC' } });
  }

  findByPessoa(pessoaId: number): Promise<FichaAcompanhamento[]> {
    return this.fichasRepo.find({
      where: { pessoa: { id: pessoaId } },
      order: { dataAtendimento: 'DESC' },
    });
  }

  async findOne(id: number): Promise<FichaAcompanhamento> {
    const ficha = await this.fichasRepo.findOne({ where: { id } });
    if (!ficha) throw new NotFoundException('Ficha não encontrada');
    return ficha;
  }

  async update(
    id: number,
    dto: UpdateFichaAcompanhamentoDto,
  ): Promise<FichaAcompanhamento> {
    const ficha = await this.findOne(id);
    const { pessoaId, usuarioId, ...rest } = dto;
    if (pessoaId) ficha.pessoa = { id: pessoaId } as Pessoa;
    if (usuarioId) ficha.usuario = { id: usuarioId } as Usuario;
    Object.assign(ficha, rest);
    return this.fichasRepo.save(ficha);
  }

  async remove(id: number): Promise<void> {
    const ficha = await this.findOne(id);
    await this.fichasRepo.remove(ficha);
  }
}

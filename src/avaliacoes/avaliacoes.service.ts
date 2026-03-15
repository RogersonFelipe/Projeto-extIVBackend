import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao } from './entities/avaliacao.entity';
import type { Pessoa } from '../pessoas/entities/pessoa.entity';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacoesService {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacoesRepo: Repository<Avaliacao>,
  ) {}

  create(dto: CreateAvaliacaoDto): Promise<Avaliacao> {
    const { pessoaId, ...rest } = dto;
    const avaliacao = this.avaliacoesRepo.create({
      ...rest,
      pessoa: { id: pessoaId } as Pessoa,
    });
    return this.avaliacoesRepo.save(avaliacao);
  }

  findAll(): Promise<Avaliacao[]> {
    return this.avaliacoesRepo.find({ order: { createdAt: 'DESC' } });
  }

  findByPessoa(pessoaId: number): Promise<Avaliacao[]> {
    return this.avaliacoesRepo.find({
      where: { pessoa: { id: pessoaId } },
      order: { dataAvaliacao: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Avaliacao> {
    const avaliacao = await this.avaliacoesRepo.findOne({ where: { id } });
    if (!avaliacao) throw new NotFoundException('Avaliação não encontrada');
    return avaliacao;
  }

  async update(id: number, dto: UpdateAvaliacaoDto): Promise<Avaliacao> {
    const avaliacao = await this.findOne(id);
    const { pessoaId, ...rest } = dto;
    if (pessoaId) avaliacao.pessoa = { id: pessoaId } as Pessoa;
    Object.assign(avaliacao, rest);
    return this.avaliacoesRepo.save(avaliacao);
  }

  async remove(id: number): Promise<void> {
    const avaliacao = await this.findOne(id);
    await this.avaliacoesRepo.remove(avaliacao);
  }
}

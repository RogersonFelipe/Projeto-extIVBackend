import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Encaminhamento } from './entities/encaminhamento.entity';
import type { Pessoa } from '../pessoas/entities/pessoa.entity';
import type { Empresa } from '../empresas/entities/empresa.entity';
import { CreateEncaminhamentoDto } from './dto/create-encaminhamento.dto';
import { UpdateEncaminhamentoDto } from './dto/update-encaminhamento.dto';

@Injectable()
export class EncaminhamentosService {
  constructor(
    @InjectRepository(Encaminhamento)
    private readonly encaminhamentosRepo: Repository<Encaminhamento>,
  ) {}

  create(dto: CreateEncaminhamentoDto): Promise<Encaminhamento> {
    const { pessoaId, empresaId, ...rest } = dto;
    const encaminhamento = this.encaminhamentosRepo.create({
      ...rest,
      pessoa: { id: pessoaId } as Pessoa,
      empresa: empresaId ? ({ id: empresaId } as Empresa) : undefined,
    });
    return this.encaminhamentosRepo.save(encaminhamento);
  }

  findAll(): Promise<Encaminhamento[]> {
    return this.encaminhamentosRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  findByPessoa(pessoaId: number): Promise<Encaminhamento[]> {
    return this.encaminhamentosRepo.find({
      where: { pessoa: { id: pessoaId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Encaminhamento> {
    const enc = await this.encaminhamentosRepo.findOne({ where: { id } });
    if (!enc) throw new NotFoundException('Encaminhamento não encontrado');
    return enc;
  }

  async update(
    id: number,
    dto: UpdateEncaminhamentoDto,
  ): Promise<Encaminhamento> {
    const enc = await this.findOne(id);
    const { pessoaId, empresaId, ...rest } = dto;
    if (pessoaId) enc.pessoa = { id: pessoaId } as Pessoa;
    if (empresaId) enc.empresa = { id: empresaId } as Empresa;
    Object.assign(enc, rest);
    return this.encaminhamentosRepo.save(enc);
  }

  async remove(id: number): Promise<void> {
    const enc = await this.findOne(id);
    await this.encaminhamentosRepo.remove(enc);
  }
}

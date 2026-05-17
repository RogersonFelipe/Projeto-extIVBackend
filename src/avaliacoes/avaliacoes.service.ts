import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Avaliacao,
  ResultadoControle,
  StatusAvaliacao,
  TipoAvaliacao,
} from './entities/avaliacao.entity';
import {
  Encaminhamento,
  StatusEncaminhamento,
} from '../encaminhamentos/entities/encaminhamento.entity';
import type { Pessoa } from '../pessoas/entities/pessoa.entity';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacoesService {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacoesRepo: Repository<Avaliacao>,
    @InjectRepository(Encaminhamento)
    private readonly encaminhamentosRepo: Repository<Encaminhamento>,
  ) {}

  private resolveStatusAvaliacao(
    current: Avaliacao | null,
    dto: CreateAvaliacaoDto | UpdateAvaliacaoDto,
  ): StatusAvaliacao {
    if (dto.statusAvaliacao) return dto.statusAvaliacao;

    const resultado = dto.resultado ?? current?.resultado;
    if (
      resultado === ResultadoControle.APROVADO ||
      resultado === ResultadoControle.REPROVADO
    ) {
      return StatusAvaliacao.FINALIZADO;
    }

    return StatusAvaliacao.EM_ABERTO;
  }

  async create(dto: CreateAvaliacaoDto): Promise<Avaliacao> {
    const { pessoaId, encaminhamentoId, ...rest } = dto;

    const avaliacao = this.avaliacoesRepo.create({
      ...rest,
      statusAvaliacao: this.resolveStatusAvaliacao(null, dto),
      pessoa: { id: pessoaId } as Pessoa,
      encaminhamento: encaminhamentoId
        ? ({ id: encaminhamentoId } as Encaminhamento)
        : null,
    });

    const saved = await this.avaliacoesRepo.save(avaliacao);

    if (encaminhamentoId && dto.tipo === TipoAvaliacao.INICIAL) {
      await this.encaminhamentosRepo.update(encaminhamentoId, {
        status: StatusEncaminhamento.DESLIGADO,
      });
    }

    return this.findOne(saved.id);
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
    avaliacao.statusAvaliacao = this.resolveStatusAvaliacao(avaliacao, dto);
    const saved = await this.avaliacoesRepo.save(avaliacao);
    return this.findOne(saved.id);
  }

  async remove(id: number): Promise<void> {
    const avaliacao = await this.findOne(id);
    await this.avaliacoesRepo.remove(avaliacao);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Avaliacao, StatusAvaliacao } from './entities/avaliacao.entity';
import type { Pessoa } from '../pessoas/entities/pessoa.entity';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

const QUESTION_KEYS = Array.from(
  { length: 46 },
  (_, index) => `q${String(index + 1).padStart(2, '0')}`,
) as Array<`q${string}`>;

@Injectable()
export class AvaliacoesService {
  constructor(
    @InjectRepository(Avaliacao)
    private readonly avaliacoesRepo: Repository<Avaliacao>,
  ) {}

  private resolveStatusAvaliacao(
    current: Avaliacao | null,
    dto: CreateAvaliacaoDto | UpdateAvaliacaoDto,
  ): StatusAvaliacao {
    if (dto.statusAvaliacao) return dto.statusAvaliacao;

    const hasQuestionInPayload = QUESTION_KEYS.some(
      (key) => key in (dto as Record<string, unknown>),
    );

    if (!hasQuestionInPayload) {
      return current?.statusAvaliacao ?? StatusAvaliacao.EM_ABERTO;
    }

    const answeredAll = QUESTION_KEYS.every((key) => {
      const valueFromDto = (dto as Record<string, unknown>)[key];
      const value =
        valueFromDto !== undefined
          ? valueFromDto
          : current
            ? (current as unknown as Record<string, unknown>)[key]
            : undefined;

      return value !== null && value !== undefined;
    });

    return answeredAll ? StatusAvaliacao.FINALIZADO : StatusAvaliacao.EM_ABERTO;
  }

  async create(dto: CreateAvaliacaoDto): Promise<Avaliacao> {
    const { pessoaId, ...rest } = dto;
    const avaliacao = this.avaliacoesRepo.create({
      ...rest,
      statusAvaliacao: this.resolveStatusAvaliacao(null, dto),
      pessoa: { id: pessoaId } as Pessoa,
    });
    const saved = await this.avaliacoesRepo.save(avaliacao);
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

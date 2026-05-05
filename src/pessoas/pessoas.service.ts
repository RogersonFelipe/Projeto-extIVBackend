import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoasRepo: Repository<Pessoa>,
  ) {}

  async create(dto: CreatePessoaDto): Promise<Pessoa> {
    const pessoa = this.pessoasRepo.create(dto);
    try {
      return await this.pessoasRepo.save(pessoa);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as { code?: string }).code === '23505') {
        throw new ConflictException('CPF já cadastrado');
      }
      throw error;
    }
  }

  findAll(): Promise<Pessoa[]> {
    return this.pessoasRepo.find({ order: { nome: 'ASC' } });
  }

  async findOne(id: number): Promise<Pessoa> {
    const pessoa = await this.pessoasRepo.findOne({ where: { id } });
    if (!pessoa) throw new NotFoundException('Pessoa não encontrada');
    return pessoa;
  }

  async update(id: number, dto: UpdatePessoaDto): Promise<Pessoa> {
    const pessoa = await this.findOne(id);
    Object.assign(pessoa, dto);
    try {
      return await this.pessoasRepo.save(pessoa);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as { code?: string }).code === '23505') {
        throw new ConflictException('CPF já cadastrado');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const pessoa = await this.findOne(id);
    await this.pessoasRepo.remove(pessoa);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { CreatePessoaDto } from './dto/create-pessoa.dto';
import { UpdatePessoaDto } from './dto/update-pessoa.dto';

@Injectable()
export class PessoasService {
  constructor(
    @InjectRepository(Pessoa)
    private readonly pessoasRepo: Repository<Pessoa>,
  ) {}

  create(dto: CreatePessoaDto): Promise<Pessoa> {
    const pessoa = this.pessoasRepo.create(dto);
    return this.pessoasRepo.save(pessoa);
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
    return this.pessoasRepo.save(pessoa);
  }

  async remove(id: number): Promise<void> {
    const pessoa = await this.findOne(id);
    await this.pessoasRepo.remove(pessoa);
  }
}

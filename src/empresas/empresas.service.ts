import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresasRepo: Repository<Empresa>,
  ) {}

  create(dto: CreateEmpresaDto): Promise<Empresa> {
    const empresa = this.empresasRepo.create(dto);
    return this.empresasRepo.save(empresa);
  }

  findAll(): Promise<Empresa[]> {
    return this.empresasRepo.find({ order: { nome: 'ASC' } });
  }

  async findOne(id: number): Promise<Empresa> {
    const empresa = await this.empresasRepo.findOne({ where: { id } });
    if (!empresa) throw new NotFoundException('Empresa não encontrada');
    return empresa;
  }

  async update(id: number, dto: UpdateEmpresaDto): Promise<Empresa> {
    const empresa = await this.findOne(id);
    Object.assign(empresa, dto);
    return this.empresasRepo.save(empresa);
  }

  async remove(id: number): Promise<void> {
    const empresa = await this.findOne(id);
    await this.empresasRepo.remove(empresa);
  }
}

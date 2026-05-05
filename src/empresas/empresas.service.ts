import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { Empresa } from './entities/empresa.entity';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';

@Injectable()
export class EmpresasService {
  constructor(
    @InjectRepository(Empresa)
    private readonly empresasRepo: Repository<Empresa>,
  ) {}

  async create(dto: CreateEmpresaDto): Promise<Empresa> {
    const empresa = this.empresasRepo.create(dto);
    try {
      return await this.empresasRepo.save(empresa);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as { code?: string }).code === '23505') {
        throw new ConflictException('CNPJ já cadastrado');
      }
      throw error;
    }
  }

  findAll(): Promise<Empresa[]> {
    return this.empresasRepo.find({ order: { nomeFantasia: 'ASC' } });
  }

  async findOne(id: number): Promise<Empresa> {
    const empresa = await this.empresasRepo.findOne({ where: { id } });
    if (!empresa) throw new NotFoundException('Empresa não encontrada');
    return empresa;
  }

  async update(id: number, dto: UpdateEmpresaDto): Promise<Empresa> {
    const empresa = await this.findOne(id);
    Object.assign(empresa, dto);
    try {
      return await this.empresasRepo.save(empresa);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as { code?: string }).code === '23505') {
        throw new ConflictException('CNPJ já cadastrado');
      }
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const empresa = await this.findOne(id);
    await this.empresasRepo.remove(empresa);
  }
}

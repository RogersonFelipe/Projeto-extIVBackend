import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EncaminhamentosService } from './encaminhamentos.service';
import { CreateEncaminhamentoDto } from './dto/create-encaminhamento.dto';
import { UpdateEncaminhamentoDto } from './dto/update-encaminhamento.dto';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { NivelAcesso } from '../usuarios/entities/usuario.entity';

@ApiTags('Encaminhamentos')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('encaminhamentos')
export class EncaminhamentosController {
  constructor(
    private readonly encaminhamentosService: EncaminhamentosService,
  ) {}

  @Post()
  create(@Body() dto: CreateEncaminhamentoDto) {
    return this.encaminhamentosService.create(dto);
  }

  @Get()
  findAll() {
    return this.encaminhamentosService.findAll();
  }

  @Get('pessoa/:pessoaId')
  findByPessoa(@Param('pessoaId', ParseIntPipe) pessoaId: number) {
    return this.encaminhamentosService.findByPessoa(pessoaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.encaminhamentosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateEncaminhamentoDto,
  ) {
    return this.encaminhamentosService.update(id, dto);
  }

  @Delete(':id')
  @Roles(NivelAcesso.ADMIN)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.encaminhamentosService.remove(id);
  }
}

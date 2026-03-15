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
import { FichasAcompanhamentoService } from './fichas-acompanhamento.service';
import { CreateFichaAcompanhamentoDto } from './dto/create-ficha-acompanhamento.dto';
import { UpdateFichaAcompanhamentoDto } from './dto/update-ficha-acompanhamento.dto';

@ApiTags('Fichas de Acompanhamento')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('fichas-acompanhamento')
export class FichasAcompanhamentoController {
  constructor(private readonly fichasService: FichasAcompanhamentoService) {}

  @Post()
  create(@Body() dto: CreateFichaAcompanhamentoDto) {
    return this.fichasService.create(dto);
  }

  @Get()
  findAll() {
    return this.fichasService.findAll();
  }

  @Get('pessoa/:pessoaId')
  findByPessoa(@Param('pessoaId', ParseIntPipe) pessoaId: number) {
    return this.fichasService.findByPessoa(pessoaId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fichasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFichaAcompanhamentoDto,
  ) {
    return this.fichasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.fichasService.remove(id);
  }
}

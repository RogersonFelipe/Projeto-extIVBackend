import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { StatusFichaAcompanhamento } from '../entities/ficha-acompanhamento.entity';

export class CreateFichaAcompanhamentoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  pessoaId: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  empresaId?: number;

  @ApiPropertyOptional({ example: '2025-03-21' })
  @IsOptional()
  @IsString()
  dataVisita?: string;

  @ApiPropertyOptional({ example: '2025-02-10' })
  @IsOptional()
  @IsString()
  dataAdmissao?: string;

  @ApiPropertyOptional({ example: 'Carlos - RH' })
  @IsOptional()
  @IsString()
  contatoRh?: string;

  @ApiPropertyOptional({ example: 'Telefone / WhatsApp / E-mail' })
  @IsOptional()
  @IsString()
  contatoCom?: string;

  @ApiPropertyOptional({ enum: StatusFichaAcompanhamento })
  @IsOptional()
  @IsEnum(StatusFichaAcompanhamento)
  status?: StatusFichaAcompanhamento;

  @ApiPropertyOptional({
    example: 'Usuário apresentou boa adaptação ao ambiente de trabalho.',
  })
  @IsOptional()
  @IsString()
  parecerGeral?: string;
}

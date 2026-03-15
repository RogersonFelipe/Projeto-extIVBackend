import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFichaAcompanhamentoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  pessoaId: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsInt()
  usuarioId?: number;

  @ApiPropertyOptional({ example: '2024-03-15' })
  @IsOptional()
  @IsString()
  dataAtendimento?: string;

  @ApiPropertyOptional({ example: 'Social' })
  @IsOptional()
  @IsString()
  tipo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  evolucao?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  plano?: string;

  @ApiPropertyOptional({
    enum: ['ativo', 'encerrado', 'suspenso'],
    default: 'ativo',
  })
  @IsOptional()
  @IsIn(['ativo', 'encerrado', 'suspenso'])
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observacoes?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { StatusEncaminhamento } from '../entities/encaminhamento.entity';

export class CreateEncaminhamentoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  pessoaId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  empresaId: number;

  @ApiPropertyOptional({ example: '2025-01-15' })
  @IsOptional()
  @IsString()
  dataAdmissao?: string;

  @ApiPropertyOptional({ example: 'Auxiliar Administrativo' })
  @IsOptional()
  @IsString()
  funcao?: string;

  @ApiPropertyOptional({ example: 'Carlos - (48) 99999-0000' })
  @IsOptional()
  @IsString()
  contatoRh?: string;

  @ApiPropertyOptional({ example: '2025-12-31' })
  @IsOptional()
  @IsString()
  dataProvavelDesligamento?: string;

  @ApiPropertyOptional({
    enum: StatusEncaminhamento,
    default: StatusEncaminhamento.ATIVO,
  })
  @IsOptional()
  @IsEnum(StatusEncaminhamento)
  status?: StatusEncaminhamento;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observacoes?: string;
}

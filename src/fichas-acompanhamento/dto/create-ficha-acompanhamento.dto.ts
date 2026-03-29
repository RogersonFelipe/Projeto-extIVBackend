import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

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

  @ApiPropertyOptional({ example: 'Carlos - RH' })
  @IsOptional()
  @IsString()
  contatoRh?: string;

  @ApiPropertyOptional({
    example: 'Usuário apresentou boa adaptação ao ambiente de trabalho.',
  })
  @IsOptional()
  @IsString()
  parecerGeral?: string;
}

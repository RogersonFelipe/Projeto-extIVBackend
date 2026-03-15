import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateAvaliacaoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  pessoaId: number;

  @ApiPropertyOptional({ example: '2024-03-10' })
  @IsOptional()
  @IsString()
  dataAvaliacao?: string;

  @ApiPropertyOptional({ example: 'Psicológica' })
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
  resultado?: string;

  @ApiPropertyOptional({ example: '2024-06-10' })
  @IsOptional()
  @IsString()
  proximaAvaliacao?: string;

  @ApiPropertyOptional({
    enum: ['pendente', 'realizada', 'cancelada'],
    default: 'pendente',
  })
  @IsOptional()
  @IsIn(['pendente', 'realizada', 'cancelada'])
  status?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observacoes?: string;
}

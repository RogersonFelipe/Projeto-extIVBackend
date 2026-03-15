import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateEncaminhamentoDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  pessoaId: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsInt()
  empresaId?: number;

  @ApiPropertyOptional({ example: '2024-03-01' })
  @IsOptional()
  @IsString()
  dataEncaminhamento?: string;

  @ApiPropertyOptional({ example: '2024-03-15' })
  @IsOptional()
  @IsString()
  dataRetorno?: string;

  @ApiPropertyOptional({
    enum: ['pendente', 'em_andamento', 'contratado', 'recusado', 'cancelado'],
    default: 'pendente',
  })
  @IsOptional()
  @IsIn(['pendente', 'em_andamento', 'contratado', 'recusado', 'cancelado'])
  status?: string;

  @ApiPropertyOptional({ example: 'Auxiliar Administrativo' })
  @IsOptional()
  @IsString()
  cargo?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observacoes?: string;
}

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsIn, IsOptional, IsString } from 'class-validator';

export class CreatePessoaDto {
  @ApiProperty({ example: 'Maria Souza' })
  @IsString()
  nome: string;

  @ApiPropertyOptional({ example: '2000-05-20' })
  @IsOptional()
  @IsString()
  dataNascimento?: string;

  @ApiPropertyOptional({ example: '2024-01-10' })
  @IsOptional()
  @IsString()
  dataEntrada?: string;

  @ApiPropertyOptional({ enum: ['ativo', 'inativo'], default: 'ativo' })
  @IsOptional()
  @IsIn(['ativo', 'inativo'])
  status?: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  usaMedicamento?: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  infoMedicamentos?: string;

  @ApiPropertyOptional({ example: '(48) 99999-9999' })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiPropertyOptional({ example: 'José Souza' })
  @IsOptional()
  @IsString()
  nomeResponsavel?: string;

  @ApiPropertyOptional({ example: '(48) 98888-8888' })
  @IsOptional()
  @IsString()
  telefoneResponsavel?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fotoUrl?: string;
}

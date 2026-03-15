import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @ApiProperty({ example: 'Empresa ABC Ltda' })
  @IsString()
  nome: string;

  @ApiPropertyOptional({ example: '12.345.678/0001-99' })
  @IsOptional()
  @IsString()
  cnpj?: string;

  @ApiPropertyOptional({ example: 'Rua das Flores, 100 - Criciúma/SC' })
  @IsOptional()
  @IsString()
  endereco?: string;

  @ApiPropertyOptional({ example: '(48) 3333-4444' })
  @IsOptional()
  @IsString()
  telefone?: string;

  @ApiPropertyOptional({ example: 'Carlos RH' })
  @IsOptional()
  @IsString()
  nomeContato?: string;

  @ApiPropertyOptional({ example: 'rh@empresaabc.com' })
  @IsOptional()
  @IsEmail()
  emailContato?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  observacoes?: string;

  @ApiPropertyOptional({ default: true })
  @IsOptional()
  @IsBoolean()
  ativa?: boolean;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class CreateEmpresaDto {
  @ApiPropertyOptional({ example: 'ABC Ltda' })
  @IsOptional()
  @IsString()
  nomeFantasia?: string;

  @ApiPropertyOptional({ example: 'ABC Comércio e Serviços Ltda' })
  @IsOptional()
  @IsString()
  razaoSocial?: string;

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

  @ApiPropertyOptional({ example: 'Carlos Silva' })
  @IsOptional()
  @IsString()
  contatoRhNome?: string;

  @ApiPropertyOptional({ example: 'rh@abc.com' })
  @IsOptional()
  @IsEmail()
  contatoRhEmail?: string;
}

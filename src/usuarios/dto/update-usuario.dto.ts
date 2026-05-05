import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { NivelAcesso } from '../entities/usuario.entity';

export class UpdateUsuarioDto {
  @ApiPropertyOptional({ example: 'Rogerson Ramos' })
  @IsOptional()
  @IsString()
  nome?: string;

  @ApiPropertyOptional({ example: 'roger@email.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ minLength: 6 })
  @IsOptional()
  @IsString()
  @MinLength(6)
  senha?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  fotoUrl?: string;

  @ApiPropertyOptional({ enum: NivelAcesso })
  @IsOptional()
  @IsEnum(NivelAcesso)
  nivelAcesso?: NivelAcesso;
}

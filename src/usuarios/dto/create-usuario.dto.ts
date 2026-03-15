import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { NivelAcesso } from '../entities/usuario.entity';

export class CreateUsuarioDto {
  @ApiProperty({ example: 'Rogerson Ramos' })
  @IsString()
  nome: string;

  @ApiProperty({ example: 'roger@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SuaSenha1234', minLength: 6 })
  @IsString()
  @MinLength(6)
  senha: string;

  @ApiPropertyOptional({ enum: NivelAcesso, default: NivelAcesso.USUARIO })
  @IsOptional()
  @IsEnum(NivelAcesso)
  nivelAcesso?: NivelAcesso;
}

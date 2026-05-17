import { IsString, MinLength } from 'class-validator';

export class NovaSenhaDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(6, { message: 'Mínimo 6 caracteres' })
  novaSenha: string;
}

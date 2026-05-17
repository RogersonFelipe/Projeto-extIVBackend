import { IsEmail } from 'class-validator';

export class RecuperarSenhaDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;
}

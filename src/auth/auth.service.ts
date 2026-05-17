import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UsuariosService } from '../usuarios/usuarios.service';
import { MailService } from '../mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { RecuperarSenhaDto } from './dto/recuperar-senha.dto';
import { NovaSenhaDto } from './dto/nova-senha.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  async login(dto: LoginDto) {
    const usuario = await this.usuariosService.findByEmail(dto.email);
    if (!usuario) throw new UnauthorizedException('Credenciais inválidas');

    const senhaValida = await bcrypt.compare(dto.senha, usuario.senhaHash);
    if (!senhaValida) throw new UnauthorizedException('Credenciais inválidas');

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      nivelAcesso: usuario.nivelAcesso,
    };

    return {
      access_token: this.jwtService.sign(payload),
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        fotoUrl: usuario.fotoUrl,
        nivelAcesso: usuario.nivelAcesso,
      },
    };
  }

  async recuperarSenha(dto: RecuperarSenhaDto) {
    const msg = {
      message: 'Se o e-mail estiver cadastrado, você receberá as instruções.',
    };

    const usuario = await this.usuariosService.findByEmail(dto.email);
    if (!usuario) return msg;

    const token = crypto.randomBytes(32).toString('hex');
    const validade = new Date(Date.now() + 60 * 60 * 1000);

    await this.usuariosService.salvarTokenRecuperacao(
      usuario.id,
      token,
      validade,
    );
    await this.mailService.sendRecuperacaoSenha(
      usuario.email,
      usuario.nome,
      token,
    );

    return msg;
  }

  async novaSenha(dto: NovaSenhaDto) {
    const usuario = await this.usuariosService.findByToken(dto.token);
    if (!usuario) throw new BadRequestException('Token inválido ou expirado');

    if (!usuario.validadeToken || usuario.validadeToken < new Date()) {
      throw new BadRequestException('Token inválido ou expirado');
    }

    await this.usuariosService.resetarSenha(usuario.id, dto.novaSenha);
    return { message: 'Senha redefinida com sucesso.' };
  }
}

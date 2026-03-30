import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsuariosService } from '../usuarios/usuarios.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    config: ConfigService,
    private readonly usuariosService: UsuariosService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }

  async validate(payload: { sub: number; email: string; nivelAcesso }) {
    const usuario = await this.usuariosService.findOne(payload.sub);
    if (!usuario) throw new UnauthorizedException();
    return usuario;
  }
}

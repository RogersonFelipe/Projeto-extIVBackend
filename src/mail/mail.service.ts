import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private readonly config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp-relay.brevo.com',
      port: 587,
      secure: false,
      auth: {
        user: this.config.get<string>('BREVO_LOGIN'),
        pass: this.config.get<string>('BREVO_SMTP_KEY'),
      },
    });
  }

  async sendRecuperacaoSenha(email: string, nome: string, token: string) {
    const frontUrl = this.config.get<string>('FRONTEND_URL') ?? 'http://localhost:5173';
    const link = `${frontUrl}/nova-senha?token=${token}`;

    await this.transporter.sendMail({
      from: `"Instituto Diomício Freitas" <${this.config.get('BREVO_FROM')}>`,
      to: email,
      subject: 'Recuperação de senha',
      html: `
        <p>Olá, <strong>${nome}</strong>.</p>
        <p>Clique no botão abaixo para redefinir sua senha. O link expira em <strong>1 hora</strong>.</p>
        <p style="margin:24px 0">
          <a href="${link}" style="background:#1d4ed8;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600">
            Redefinir senha
          </a>
        </p>
        <p style="color:#6b7280;font-size:12px">Se você não solicitou isso, ignore este e-mail.</p>
      `,
    });
  }
}

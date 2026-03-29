import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { EmpresasModule } from './empresas/empresas.module';
import { EncaminhamentosModule } from './encaminhamentos/encaminhamentos.module';
import { AvaliacoesModule } from './avaliacoes/avaliacoes.module';
import { FichasAcompanhamentoModule } from './fichas-acompanhamento/fichas-acompanhamento.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
        synchronize: process.env.NODE_ENV !== 'production',
        migrationsRun: process.env.NODE_ENV === 'production',
      }),
    }),
    UsuariosModule,
    AuthModule,
    PessoasModule,
    EmpresasModule,
    EncaminhamentosModule,
    AvaliacoesModule,
    FichasAcompanhamentoModule,
  ],
})
export class AppModule {}

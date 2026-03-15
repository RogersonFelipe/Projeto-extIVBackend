import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FichaAcompanhamento } from './entities/ficha-acompanhamento.entity';
import { FichasAcompanhamentoService } from './fichas-acompanhamento.service';
import { FichasAcompanhamentoController } from './fichas-acompanhamento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FichaAcompanhamento])],
  controllers: [FichasAcompanhamentoController],
  providers: [FichasAcompanhamentoService],
  exports: [FichasAcompanhamentoService],
})
export class FichasAcompanhamentoModule {}

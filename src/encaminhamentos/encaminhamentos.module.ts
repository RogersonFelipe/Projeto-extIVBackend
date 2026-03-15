import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Encaminhamento } from './entities/encaminhamento.entity';
import { EncaminhamentosService } from './encaminhamentos.service';
import { EncaminhamentosController } from './encaminhamentos.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Encaminhamento])],
  controllers: [EncaminhamentosController],
  providers: [EncaminhamentosService],
  exports: [EncaminhamentosService],
})
export class EncaminhamentosModule {}

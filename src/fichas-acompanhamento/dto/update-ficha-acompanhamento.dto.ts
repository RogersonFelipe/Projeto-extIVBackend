import { PartialType } from '@nestjs/swagger';
import { CreateFichaAcompanhamentoDto } from './create-ficha-acompanhamento.dto';

export class UpdateFichaAcompanhamentoDto extends PartialType(
  CreateFichaAcompanhamentoDto,
) {}

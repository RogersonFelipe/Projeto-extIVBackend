import { PartialType } from '@nestjs/swagger';
import { CreateEncaminhamentoDto } from './create-encaminhamento.dto';

export class UpdateEncaminhamentoDto extends PartialType(
  CreateEncaminhamentoDto,
) {}

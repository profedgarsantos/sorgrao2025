import { PartialType } from '@nestjs/swagger';
import { CreateFechamentoDto } from './create-fechamento.dto';

export class UpdateFechamentoDto extends PartialType(CreateFechamentoDto) {}

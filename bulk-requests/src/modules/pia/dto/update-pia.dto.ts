import { PartialType } from '@nestjs/mapped-types';
import { CreatePiaDto } from './create-pia.dto';

export class UpdatePiaDto extends PartialType(CreatePiaDto) {}

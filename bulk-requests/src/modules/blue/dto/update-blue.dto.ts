import { PartialType } from '@nestjs/mapped-types';
import { CreateBlueDto } from './create-blue.dto';

export class UpdateBlueDto extends PartialType(CreateBlueDto) {}

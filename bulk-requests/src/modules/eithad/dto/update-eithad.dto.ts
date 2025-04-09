import { PartialType } from '@nestjs/mapped-types';
import { CreateEithadDto } from './create-eithad.dto';

export class UpdateEithadDto extends PartialType(CreateEithadDto) {}

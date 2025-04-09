import { PartialType } from '@nestjs/mapped-types';
import { CreateDubaiDto } from './create-dubai.dto';

export class UpdateDubaiDto extends PartialType(CreateDubaiDto) {}

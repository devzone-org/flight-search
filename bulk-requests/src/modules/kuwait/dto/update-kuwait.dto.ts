import { PartialType } from '@nestjs/mapped-types';
import { CreateKuwaitDto } from './create-kuwait.dto';

export class UpdateKuwaitDto extends PartialType(CreateKuwaitDto) {}

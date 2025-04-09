import { PartialType } from '@nestjs/mapped-types';
import { CreateBulkRequestDto } from './create-bulk-request.dto';

export class UpdateBulkRequestDto extends PartialType(CreateBulkRequestDto) {}

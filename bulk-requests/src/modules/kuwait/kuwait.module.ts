import { Module } from '@nestjs/common';
import { KuwaitService } from './kuwait.service';
import { KuwaitController } from './kuwait.controller';

@Module({
  controllers: [KuwaitController],
  providers: [KuwaitService],
  exports:[KuwaitService]
})
export class KuwaitModule {}

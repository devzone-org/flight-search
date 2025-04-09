import { Module } from '@nestjs/common';
import { BlueService } from './blue.service';
import { BlueController } from './blue.controller';

@Module({
  controllers: [BlueController],
  providers: [BlueService],
  exports: [BlueService]
})
export class BlueModule {}

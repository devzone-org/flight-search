import { Module } from '@nestjs/common';
import { DubaiService } from './dubai.service';
import { DubaiController } from './dubai.controller';

@Module({
  controllers: [DubaiController],
  providers: [DubaiService],
  exports:[DubaiService]
})
export class DubaiModule {}

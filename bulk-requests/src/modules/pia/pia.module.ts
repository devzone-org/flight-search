import { Module } from '@nestjs/common';
import { PiaService } from './pia.service';
import { PiaController } from './pia.controller';

@Module({
  controllers: [PiaController],
  providers: [PiaService],
  exports: [PiaService]
})
export class PiaModule {}

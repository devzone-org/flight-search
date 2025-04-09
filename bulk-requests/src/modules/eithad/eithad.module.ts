import { Module } from '@nestjs/common';
import { EithadService } from './eithad.service';
import { EithadController } from './eithad.controller';

@Module({
  controllers: [EithadController],
  providers: [EithadService],
  exports: [EithadService]
})
export class EithadModule {}

import { Module } from '@nestjs/common';
import { BulkRequestsService } from './bulk-requests.service';
import { BulkRequestsController } from './bulk-requests.controller';
import { KuwaitModule } from '../kuwait/kuwait.module';
import { BlueModule } from '../blue/blue.module';
import { DubaiModule } from '../dubai/dubai.module';
import { EithadModule } from '../eithad/eithad.module';
import { PiaModule } from '../pia/pia.module';

@Module({
  imports: [KuwaitModule, BlueModule, DubaiModule, EithadModule, PiaModule],
  controllers: [BulkRequestsController],
  providers: [BulkRequestsService],
})
export class BulkRequestsModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BulkRequestsModule } from './modules/bulk-requests/bulk-requests.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { KuwaitModule } from './modules/kuwait/kuwait.module';
import { BlueModule } from './modules/blue/blue.module';
import { PiaModule } from './modules/pia/pia.module';
import { EithadModule } from './modules/eithad/eithad.module';
import { DubaiModule } from './modules/dubai/dubai.module';

@Module({
  imports: [BulkRequestsModule, AuthModule, UsersModule, KuwaitModule, BlueModule, PiaModule, EithadModule, DubaiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

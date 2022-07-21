import { Module } from '@nestjs/common';
import { AdvertiseService } from './advertise.service';
import { AdvertiseController } from './advertise.controller';

@Module({
  controllers: [AdvertiseController],
  providers: [AdvertiseService]
})
export class AdvertiseModule {}

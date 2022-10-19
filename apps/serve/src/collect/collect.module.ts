import { Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';

@Module({
  controllers: [CollectController],
  providers: [CollectService]
})
export class CollectModule {}

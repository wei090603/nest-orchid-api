import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { MessageModule } from '../message/message.module';
import { DynamicModule } from '../dynamic/dynamic.module';

@Module({
  imports: [DynamicModule, MessageModule],
  controllers: [FollowController],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}

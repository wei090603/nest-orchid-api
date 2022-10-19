import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';

@Module({
  controllers: [FollowController],
  providers: [FollowService]
})
export class FollowModule {}

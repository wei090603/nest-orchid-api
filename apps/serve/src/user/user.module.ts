/*
 * @Description:
 * @Author: tao.wei
 * @Date: 2021-09-19 10:50:06
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FollowModule } from '../follow/follow.module';
// import { EmailModule } from '@libs/email';

@Module({
  imports: [FollowModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}

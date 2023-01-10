/*
 * @Description:
 * @Author: tao.wei
 * @Date: 2021-09-19 10:50:06
 */
import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FollowModule } from '../follow/follow.module';
import { SignModule } from '../sign/sign.module';
import { LikeModule } from '../like/like.module';
import { CollectModule } from '../collect/collect.module';
import { ArticleModule } from '../article/article.module';
import { DynamicModule } from '../dynamic/dynamic.module';
// import { EmailModule } from '@libs/email';

@Module({
  imports: [
    SignModule,
    DynamicModule,
    forwardRef(() => FollowModule),
    forwardRef(() => LikeModule),
    forwardRef(() => CollectModule),
    forwardRef(() => ArticleModule),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}

import { forwardRef, Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { ArticleModule } from '../article/article.module';
import { UserModule } from '../user/user.module';
import { MessageModule } from '../message/message.module';
import { DynamicModule } from '../dynamic/dynamic.module';

@Module({
  imports: [
    forwardRef(() => ArticleModule),
    forwardRef(() => UserModule),
    DynamicModule,
    MessageModule,
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}

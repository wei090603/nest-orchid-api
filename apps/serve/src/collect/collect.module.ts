import { forwardRef, Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import { ArticleModule } from '../article/article.module';
import { LikeModule } from '../like/like.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => ArticleModule),
    forwardRef(() => LikeModule),
    forwardRef(() => UserModule),
  ],
  controllers: [CollectController],
  providers: [CollectService],
  exports: [CollectService],
})
export class CollectModule {}

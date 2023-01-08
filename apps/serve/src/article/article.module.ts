import { forwardRef, Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { CollectModule } from '../collect/collect.module';
import { LikeModule } from '../like/like.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    forwardRef(() => LikeModule),
    forwardRef(() => CollectModule),
    forwardRef(() => UserModule),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}

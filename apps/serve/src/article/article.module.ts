import { forwardRef, Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { CollectModule } from '../collect/collect.module';
import { LikeModule } from '../like/like.module';

@Module({
  imports: [LikeModule, CollectModule],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}

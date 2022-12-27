import { forwardRef, Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [forwardRef(() => ArticleModule)],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService],
})
export class LikeModule {}

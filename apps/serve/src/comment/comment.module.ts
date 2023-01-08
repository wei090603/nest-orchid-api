import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { MessageModule } from '../message/message.module';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [MessageModule, ArticleModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}

import { forwardRef, Module } from '@nestjs/common';
import { CollectService } from './collect.service';
import { CollectController } from './collect.controller';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [forwardRef(() => ArticleModule)],
  controllers: [CollectController],
  providers: [CollectService],
  exports: [CollectService],
})
export class CollectModule {}

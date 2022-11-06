import { Module } from '@nestjs/common';
import { ServeController } from './serve.controller';
import { ServeService } from './serve.service';
import { CommonModule } from '@libs/common/common.module';
import { UserModule } from './user/user.module';
import { AdvertiseModule } from './advertise/advertise.module';
import { NavgationModule } from './navgation/navgation.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
import { CategoryModule } from './category/category.module';
import { CollectModule } from './collect/collect.module';
import { FollowModule } from './follow/follow.module';
import { SignModule } from './sign/sign.module';

@Module({
  imports: [CommonModule, UserModule, AdvertiseModule, NavgationModule, AuthModule, ArticleModule, TagModule, CommentModule, CategoryModule, CollectModule, FollowModule, SignModule],
  controllers: [ServeController],
  providers: [ServeService],
})
export class ServeModule {}

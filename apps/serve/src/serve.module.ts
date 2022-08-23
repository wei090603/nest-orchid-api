import { Module } from '@nestjs/common';
import { ServeController } from './serve.controller';
import { ServeService } from './serve.service';
import { CommonModule } from '@libs/common/common.module';
import { UserModule } from './user/user.module';
import { AdvertiseModule } from './advertise/advertise.module';
import { NavgationModule } from './navgation/navgation.module';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [CommonModule, UserModule, AdvertiseModule, NavgationModule, AuthModule, ArticleModule],
  controllers: [ServeController],
  providers: [ServeService],
})
export class ServeModule {}

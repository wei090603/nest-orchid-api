import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from '@libs/common';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { ArticleModule } from './article/article.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
import { NavgationModule } from './navgation/navgation.module';
import { LoginLoggerModule } from './login-logger/login-logger.module';
import { JwtAuthGuard } from 'apps/shared/guards/guard.strategy';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    CategoryModule,
    TagModule,
    ArticleModule,
    UploadModule,
    UserModule,
    NavgationModule,
    LoginLoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}

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
import { ManagerModule } from './manager/manager.module';
import { RoleModule } from './role/role.module';
import { ResourcesModule } from './resources/resources.module';
import { AdvertiseModule } from './advertise/advertise.module';
import { LoginLoggerModule } from './login-logger/login-logger.module';
import { JwtAuthGuard } from 'apps/shared/guards/guard.strategy';
import { APP_GUARD, RouterModule } from '@nestjs/core';
import { NoticeModule } from './notice/notice.module';
import { RolesGuard } from 'apps/shared/guards/roles.guard';

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
    ManagerModule,
    RoleModule,
    ResourcesModule,
    AdvertiseModule,
    LoginLoggerModule,
    NoticeModule,
    RouterModule.register([
      {
        path: 'admin',
        module: AppModule,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}

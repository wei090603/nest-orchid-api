import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './db.service';
import { Advertise } from './entity/advertise.entity';
import { Article } from './entity/article.entity';
import { ArticleLike } from './entity/articleLike.entity';
import { Category } from './entity/category.entity';
import { ArticleCollect } from './entity/articleCollect.entity';
import { LoginLogger } from './entity/loginLogger.entity';
import { Manager } from './entity/manager.entity';
import { Navgation } from './entity/navgation.entity';
import { Notice } from './entity/notice.entity';
import { Resources } from './entity/resources.entity';
import { Roles } from './entity/roles.entity';
import { Tag } from './entity/tag.entity';
import { User } from './entity/user.entity';
import { Comment } from './entity/comment.entity';
import { UserTag } from './entity/userTag.entity';
import { Follow } from './entity/follow.entity';
import { Sign } from './entity/sign.entity';
import { UserReadLike } from './entity/userReadLike.entity';

const table = [
  Category,
  Tag,
  Article,
  ArticleLike,
  ArticleCollect,
  Follow,
  Comment,
  User,
  UserTag,
  UserReadLike,
  Manager,
  Roles,
  Resources,
  Navgation,
  LoginLogger,
  Notice,
  Advertise,
  Sign,
];

const entity = TypeOrmModule.forFeature(table);

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get('db').mysql,
        entities: table,
      }),
      inject: [ConfigService],
    }),
    entity,
  ],
  providers: [DbService],
  exports: [DbService, entity],
})
export class DbModule {}

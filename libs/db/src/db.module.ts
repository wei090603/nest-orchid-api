import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbService } from './db.service';
import { Article } from './entity/article.entity';
import { Category } from './entity/category.entity';
import { Manager } from './entity/manager.entity';
import { Tag } from './entity/tag.entity';
import { User } from './entity/user.entity';

const table = [Category, Tag, Article, User];

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

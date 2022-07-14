import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import Configuration from './config';
import * as path from 'path';
import { DbModule } from '@libs/db';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      ignoreEnvFile: true, // 忽略.env读取
      load: [Configuration],
      envFilePath: [], // 配置文件路径
    }),
    DbModule,
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        storage: diskStorage({
          destination: path.join(process.cwd(), './uploads'),
          filename: (req, file, cb) => {
            // 在此处自定义保存后的文件名称
            const filename = `${Date.now() + Math.round(Math.random() * 1e9)}.${
              file.mimetype.split('/')[1]
            }`;
            return cb(null, filename);
          },
        }),
        limits: {
          fieldSize: 2000,
          field: 100,
        },
        fileFilter(req: any, file: { mimetype: string }, cb: any) {
          const type = ['jpg', 'jpeg', 'png', 'gif']
            .map((v) => `image/${v}`)
            .find((v) => v === file.mimetype);
          cb(null, type);
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [CommonService],
  exports: [CommonService, MulterModule],
})
export class CommonModule {}

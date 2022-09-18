import { NestFactory, Reflector } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';
import { ApiExceptionFilter } from 'apps/shared/filters/api-exception.filter';
import { ApiTransformInterceptor } from 'apps/shared/interceptor/api-interceptor';
// import rateLimit from 'express-rate-limit';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from 'apps/shared/pipes/validation.pipe';
import { Logger, VersioningType, VERSION_NEUTRAL } from '@nestjs/common';

async function bootstrap() {
  // 设置cors允许跨域访问
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
    bufferLogs: true,
    logger: ['log', 'error', 'warn'],
  });
  const config = app.get<ConfigService>(ConfigService);

  const { adminPrefix } = config.get('prefix');
  app.setGlobalPrefix(adminPrefix);

  // app.enableVersioning({
  //   defaultVersion: [VERSION_NEUTRAL, '1', '2'],
  //   type: VersioningType.URI,
  // });

  // 配置 文件夹为静态目录，以达到可直接访问下面文件的目的
  app.useStaticAssets('uploads', {
    prefix: '/uploads',
  });

  // 访问频率
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15分钟
  //     max: 500, // 限制15分钟内最多只能访问500次
  //   }),
  // );
  // 日志
  // app.useLogger(app.get(Logger));
  // 异常接管，统一异常返回数据
  app.useGlobalFilters(new ApiExceptionFilter());
  // 统一处理返回接口结果，如果不需要则添加
  app.useGlobalInterceptors(new ApiTransformInterceptor(new Reflector()));
  // 设置一个全局作用域的管道
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  const { adminPort } = config.get('http');
  await app.listen(adminPort);
  Logger.log(`http://localhost:${adminPort}/swagger`, '服务器启动成功');
}

bootstrap();

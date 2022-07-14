import { NestFactory, Reflector } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { Logger } from '@nestjs/common';
import { setupSwagger } from './swagger';
import { ApiExceptionFilter } from 'apps/shared/filters/api-exception.filter';
import { ApiTransformInterceptor } from 'apps/shared/interceptor/api-interceptor';
import { ConfigService } from '@nestjs/config';
import { ServeModule } from './serve.module';
import { ValidationPipe } from 'apps/shared/pipes/validation.pipe';
import { LoggingInterceptor } from 'apps/shared/logger/logging';

async function bootstrap() {
  // 设置cors允许跨域访问
  const app = await NestFactory.create<NestExpressApplication>(ServeModule, {
    cors: true,
    bufferLogs: true,
    logger: ['log', 'error', 'warn'],
  });
  // app.useWebSocketAdapter(new WsAdapter(app)); // 使用我们的适配器
  const config = app.get<ConfigService>(ConfigService);

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
  // // 统一处理返回接口结果，如果不需要则添加
  app.useGlobalInterceptors(
    new ApiTransformInterceptor(new Reflector()),
    new LoggingInterceptor(),
  );
  // 设置一个全局作用域的管道
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app);

  const { servePort } = config.get('http');
  await app.listen(servePort);

  Logger.log(`http://localhost:${servePort}/swagger`, '服务器启动成功');
}

bootstrap();

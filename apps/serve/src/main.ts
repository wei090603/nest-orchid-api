import { NestFactory } from '@nestjs/core';
import { ServeModule } from './serve.module';

async function bootstrap() {
  const app = await NestFactory.create(ServeModule);
  await app.listen(3000);
}
bootstrap();

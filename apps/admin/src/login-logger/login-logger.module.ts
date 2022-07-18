import { Module } from '@nestjs/common';
import { LoginLoggerService } from './login-logger.service';
import { LoginLoggerController } from './login-logger.controller';

@Module({
  controllers: [LoginLoggerController],
  providers: [LoginLoggerService]
})
export class LoginLoggerModule {}

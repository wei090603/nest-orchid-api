import { Module } from '@nestjs/common';
import { SignService } from './sign.service';
import { SignController } from './sign.controller';

@Module({
  controllers: [SignController],
  providers: [SignService],
  exports: [SignService],
})
export class SignModule {}

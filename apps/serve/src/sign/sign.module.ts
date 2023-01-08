import { forwardRef, Module } from '@nestjs/common';
import { SignService } from './sign.service';
import { SignController } from './sign.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [SignController],
  providers: [SignService],
  exports: [SignService],
})
export class SignModule {}

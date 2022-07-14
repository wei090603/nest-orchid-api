import { Module } from '@nestjs/common';
import { ServeController } from './serve.controller';
import { ServeService } from './serve.service';
import { CommonModule } from '@libs/common/common.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [CommonModule, UserModule],
  controllers: [ServeController],
  providers: [ServeService],
})
export class ServeModule {}

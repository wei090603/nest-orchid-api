import { Module } from '@nestjs/common';
import { ServeController } from './serve.controller';
import { ServeService } from './serve.service';

@Module({
  imports: [],
  controllers: [ServeController],
  providers: [ServeService],
})
export class ServeModule {}

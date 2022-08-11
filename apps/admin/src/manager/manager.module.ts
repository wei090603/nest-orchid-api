import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { CacheService } from 'apps/shared/redis';

@Module({
  controllers: [ManagerController],
  providers: [ManagerService, CacheService],
})
export class ManagerModule {}

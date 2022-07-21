import { Module } from '@nestjs/common';
import { NavgationService } from './navgation.service';
import { NavgationController } from './navgation.controller';

@Module({
  controllers: [NavgationController],
  providers: [NavgationService]
})
export class NavgationModule {}

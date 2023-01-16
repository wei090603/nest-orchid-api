import { Module } from '@nestjs/common';
import { EncyclopediasService } from './encyclopedias.service';
import { EncyclopediasController } from './encyclopedias.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [EncyclopediasController],
  providers: [EncyclopediasService],
})
export class EncyclopediasModule {}

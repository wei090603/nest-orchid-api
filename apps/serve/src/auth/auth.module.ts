import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.startegy';
import { CacheService } from 'apps/shared/redis';
import { SignModule } from '../sign/sign.module';

@Module({
  imports: [SignModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, CacheService],
})
export class AuthModule {}

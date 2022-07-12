import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    // 在这里添加自定义的认证逻辑
    // 例如调用 super.logIn(request) 来建立一个session
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    return user;
  }
}
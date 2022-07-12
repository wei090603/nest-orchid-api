import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const call$ = next.handle();
    if (!process.env.DOCKER_ENV) {
      return call$;
    }
    const request = context.switchToHttp().getRequest();
    const content = request.method + ' -> ' + request.url;
    Logger.log('+++ 收到请求：', content);
    const now = Date.now();
    return call$.pipe(
      tap(() =>
        Logger.log(
          '--- 响应请求：',
          content,
          `${Date.now() - now}ms`,
          'request',
        ),
      ),
    );
  }
}

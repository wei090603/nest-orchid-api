import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TRANSFORM_KEEP_KEY_METADATA } from '../contants/decorator.contants';
import { ResultData } from '../result';

/**
 * 统一处理返回接口结果，如果不需要则添加@Keep装饰器
 */
export class ApiTransformInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    const request: Request = context.switchToHttp().getRequest<Request>();
    return next.handle().pipe(
      map((data) => {
        const path = request.url;
        const method  = request.method;
        const timestamp = new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
        const keep = this.reflector.get<boolean>(TRANSFORM_KEEP_KEY_METADATA, context.getHandler());
        if (keep) {
          return data;
        } else {
          const response = context.switchToHttp().getResponse();
          response.header('Content-Type', 'application/json; charset=utf-8');
          return new ResultData(200, path, method, timestamp, data ?? null);
        }
      }),
    );
  }
}

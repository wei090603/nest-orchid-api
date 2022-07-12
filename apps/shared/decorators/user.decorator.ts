// 保存已登陆用户信息
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const user = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user
  },
);

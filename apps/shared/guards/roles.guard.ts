/*
 * @Description:
 * @Author: tao.wei
 * @Date: 2021-09-10 19:39:41
 */
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '@libs/db/entity/roles.entity';
import { ApiException } from '../exceptions/api.exception';
export const AUTHORIZE_KEY_METADATA = 'admin_module:authorize';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 检测是否是开放类型的，例如获取验证码类型的接口不需要校验，可以加入@Authorize可自动放过
    // const authorize = this.reflector.get<boolean>(
    //   AUTHORIZE_KEY_METADATA,
    //   context.getHandler(),
    // );
    // if (authorize) {
    //   return true;
    // }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (!user.roles.length) throw new ApiException(403, '对不起，您没有权限执行该操作！');
    const root = user.roles?.some((item: { id: number }) => item.id === 1);
    // 如果是超级管理员
    if(root) return true
    // 根据地址判断权限
    const url = request.route.path.substring(1);
    const method: string = request.method.toLowerCase(); // 请求方式

    const roleAPi = user.roles.map((item: Roles) => item.resources).flat();
    const result = roleAPi.some((item: { path: string }) => item.path === `${url}/${method}`)

    if (result) {
      return true
    } else {
      throw new ApiException(403, '对不起，您没有权限执行该操作！');
    }
  }
}

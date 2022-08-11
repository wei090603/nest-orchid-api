import { SetMetadata } from '@nestjs/common';

/* 操作权限标识 */
export const IS_PERMISSION_KEY = 'common:permission';

export const Permission = () => SetMetadata(IS_PERMISSION_KEY, true);

import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ApiException } from '../exceptions/api.exception';

// 设置全局验证管道
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    // value 原数据
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    // 把值反射
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const message = errors
        .map((error) => Object.values(error.constraints).join(';'))
        .join(';');
      throw new ApiException(HttpStatus.BAD_REQUEST, message);
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}

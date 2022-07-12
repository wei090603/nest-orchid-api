import { HttpException } from '@nestjs/common';
import { ErrorCodeMap } from '../contants/error-code.contants';

/**
 * Api业务异常均抛出该异常
 */
export class ApiException extends HttpException {
  /**
   * 业务类型错误代码，非Http code
   */
  private errorCode: number;

  // private message: string

  constructor(errorCode: number, errorMessage?: string) {
    super(errorMessage || ErrorCodeMap[errorCode], 200);
    this.errorCode = errorCode;
  }

  getErrorCode(): number {
    return this.errorCode;
  }
}

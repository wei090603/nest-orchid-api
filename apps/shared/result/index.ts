export class ResultData {
  readonly data: any;
  readonly code: number;
  readonly message: string;
  readonly path: string
  readonly method: string
  readonly timestamp: string

  constructor(code: number, path: string, method: string, timestamp: string,  data?: any, message = 'success',) {
    this.code = code;
    this.data = data;
    this.message = message;
    this.path = path
    this.method = method
    this.timestamp = timestamp
  }

  static success( path: string, method: string, timestamp: string, data?: any, ) {
    return new ResultData(200, path, method, timestamp, data);
  }
}

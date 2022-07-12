import { Injectable } from '@nestjs/common';

@Injectable()
export class ServeService {
  getHello(): string {
    return 'Hello World!';
  }
}

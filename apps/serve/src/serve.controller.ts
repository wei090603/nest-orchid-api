import { Controller, Get } from '@nestjs/common';
import { ServeService } from './serve.service';

@Controller()
export class ServeController {
  constructor(private readonly serveService: ServeService) {}

  @Get()
  getHello(): string {
    return this.serveService.getHello();
  }
}

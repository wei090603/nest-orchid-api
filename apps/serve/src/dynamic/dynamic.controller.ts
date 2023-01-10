import { Controller } from '@nestjs/common';
import { DynamicService } from './dynamic.service';

@Controller('dynamic')
export class DynamicController {
  constructor(private readonly dynamicService: DynamicService) {}
}

import { Controller } from '@nestjs/common';
import { AdvertiseService } from './advertise.service';

@Controller('advertise')
export class AdvertiseController {
  constructor(private readonly advertiseService: AdvertiseService) {}
}

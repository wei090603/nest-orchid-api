import { Advertise } from '@libs/db/entity/advertise.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAdvertiseDto } from './dto';

@Injectable()
export class AdvertiseService {
  constructor(
    @InjectRepository(Advertise)
    private readonly advertiseRepository: Repository<Advertise>,
  ) {}

  async findAll(params : FindAdvertiseDto) : Promise<Advertise[]> {
    return await this.advertiseRepository.find({
      select: ['id', 'picture', 'title'],
      where: {...params, status: true},
      order: { id: 'DESC' },
    });
  }
}

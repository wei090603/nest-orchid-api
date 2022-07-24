import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Navgation } from '@libs/db/entity/navgation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NavgationService {
  constructor(
    @InjectRepository(Navgation)
    private readonly navgationRepository: Repository<Navgation>,
  ) {}

  async findAll(): Promise<Navgation[]> {
    return await this.navgationRepository.find({
      order: { sort: 'ASC', id: 'DESC' },
    });
  }
}

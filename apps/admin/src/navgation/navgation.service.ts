import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Navgation } from '@libs/db/entity/navgation.entity';
import { Repository } from 'typeorm';
import { FindMenuDto, NavgationInfo } from './interface';
import { ApiException } from 'apps/shared/exceptions/api.exception';

@Injectable()
export class NavgationService {
  constructor(
    @InjectRepository(Navgation)
    private readonly navgationRepository: Repository<Navgation>,
  ) {}

  async findAll(query: FindMenuDto): Promise<Navgation[]> {
    return await this.navgationRepository.find({
      where: query,
      order: { sort: 'ASC', id: 'DESC' },
    });
  }

  async create(data: NavgationInfo) {
    const { title, link, sort } = data;
    const existing = await this.navgationRepository.findOneBy({ title });
    if (existing) throw new ApiException(10400, '导航名已存在');
    await this.navgationRepository.insert({ title, link, sort });
  }

  async update(id: number, data: NavgationInfo) {
    const { title, link, sort } = data;
    await this.navgationRepository.update(id, { title, link, sort });
  }

  async remove(id: number) {
    await this.navgationRepository.softRemove({ id });
  }
}

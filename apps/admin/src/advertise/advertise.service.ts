import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Advertise } from '@libs/db/entity/advertise.entity';
import { Like, Repository } from 'typeorm';
import { AdvertiseInfo, FindAdvertiseDto } from './interface';
import { PageResult } from 'apps/shared/dto/page.dto';

@Injectable()
export class AdvertiseService {
  constructor(
    @InjectRepository(Advertise)
    private readonly advertiseRepository: Repository<Advertise>,
  ) {}

  async findAll({ page = 1, limit = 10, ...params }: FindAdvertiseDto) {
    const { title = '', position = '' } = params;
    const [list, total] = await this.advertiseRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: { title: Like(`%${title}%`), position: Like(`%${position}%`) },
      order: { id: 'DESC' },
    });
    return { list, total };
  }

  async create(data: AdvertiseInfo) {
    const { title, status, picture, position, describe, link, sort } = data;
    await this.advertiseRepository.insert({
      title,
      status,
      picture,
      position,
      describe,
      link,
      sort,
    });
  }

  async update(id: number, data: AdvertiseInfo) {
    const { title, status, picture, position, describe, link, sort } = data;
    await this.advertiseRepository.update(id, {
      title,
      status,
      picture,
      position,
      describe,
      link,
      sort,
    });
  }

  // 修改显示隐藏状态
  async updateStatus(id: number) {
    const existing = await this.advertiseRepository.findOneBy({ id });
    await this.advertiseRepository.update(id, {
      status: !existing.status,
    });
  }

  async remove(id: number) {
    await this.advertiseRepository.softRemove({ id });
  }
}

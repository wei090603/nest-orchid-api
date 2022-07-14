import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageResult } from 'apps/shared/dto/page.dto';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { Like, Repository } from 'typeorm';
import { FindTagDto, TagInfo } from './interface';
import { Tag } from '@libs/db/entity/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async find({
    page = 1,
    limit = 10,
    ...params
  }: FindTagDto): Promise<PageResult<Tag>> {
    const { name = '' } = params;
    const [list, total] = await this.tagRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: { name: Like(`%${name}%`) },
      order: { id: 'DESC' },
    });
    return { list, total };
  }

  async create(data: TagInfo) {
    const { name } = data;
    const existing = await this.tagRepository.findOneBy({ name });
    if (existing) throw new ApiException(10400, '标签名已存在');
    await this.tagRepository.insert({ name });
  }

  async update(id: number, data: TagInfo) {
    const { name } = data;
    await this.tagRepository.update(id, { name });
  }

  async remove(id: number) {
    await this.tagRepository.softRemove({ id });
  }

  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find({
      select: ['id', 'name'],
      order: { id: 'ASC' },
    });
  }
}

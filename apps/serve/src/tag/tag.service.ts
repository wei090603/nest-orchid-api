import { Tag } from '@libs/db/entity/tag.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindTagDto, TagArticle } from './dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(query: FindTagDto): Promise<Tag[]> {
    const { name } = query;
    return await this.tagRepository
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.article', 'article')
      .select('Count(tag.id)', 'count')
      .addSelect('tag.id', 'id')
      .addSelect('tag.name', 'name')
      .where('tag.name like :name', { name: '%' + name + '%' })
      .groupBy('tag.id')
      .orderBy('count', 'DESC')
      .take(20)
      .getRawMany();
  }

  async findHot(): Promise<Tag[]> {
    return await this.tagRepository
      .createQueryBuilder('tag')
      .innerJoinAndSelect('tag.article', 'article')
      .select('Count(tag.id)', 'count')
      .addSelect('tag.id', 'id')
      .addSelect('tag.name', 'name')
      .groupBy('tag.id')
      .orderBy('count', 'DESC')
      .take(10)
      .getRawMany();
  }

  async findArticle(params: TagArticle, user: User) {
    const { id, page = 1, limit = 10 } = params;
    const [list, total] = await this.tagRepository
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.article', 'article')
      .select('tag')
      .addSelect('article')
      .orderBy('article.id', 'DESC')
      .skip(limit * (page - 1))
      .take(limit)
      .where('tag.id = :id', { id })
      .getManyAndCount();

    return { list, total };
  }

  async findOne(id: number) {
    return await this.tagRepository.findOneBy({ id });
  }
}

import { Encyclopedias } from '@libs/db/entity/encyclopedias.entity';
import { EncyclopediasCategory } from '@libs/db/entity/encyclopediasCategory.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageResult } from 'apps/shared/dto/page.dto';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { CreateEncyclopediaDto } from './dto/create.dto';
import { FindEncyclopediaDto, PageEncyclopediaList } from './dto/find.dto';
import { UpdateEncyclopediaDto } from './dto/update.dto';

@Injectable()
export class EncyclopediasService {
  constructor(
    @InjectRepository(EncyclopediasCategory)
    private readonly categoryRepository: Repository<EncyclopediasCategory>,
    @InjectRepository(Encyclopedias)
    private readonly encyclopediasRepository: Repository<Encyclopedias>,
    private readonly userService: UserService,
  ) {}

  create(createEncyclopediaDto: CreateEncyclopediaDto) {
    return 'This action adds a new encyclopedia';
  }

  async findAll(dto: FindEncyclopediaDto): Promise<PageEncyclopediaList> {
    const { categoryId, page, limit } = dto;
    const qb = this.encyclopediasRepository.createQueryBuilder('encyclopedias');
    categoryId
      ? qb.where('encyclopedias.categoryId = :categoryId', { categoryId })
      : qb;
    const [list, total] = await qb
      .select([
        'encyclopedias.id',
        'encyclopedias.title',
        'encyclopedias.summary',
        'encyclopedias.userId',
        'encyclopedias.categoryId',
        'encyclopedias.reading',
        'encyclopedias.coverPicture',
        'encyclopedias.createdAt',
      ])
      .orderBy('encyclopedias.id', 'DESC')
      .skip(limit * (page - 1))
      .take(limit)
      .getManyAndCount();

    const enList = await Promise.all(
      list.map(async ({ userId, categoryId, ...item }) => ({
        ...item,
        author: await this.userService.getUserInfo(userId),
        category: await this.getCategoryInfo(categoryId),
      })),
    );
    return { list: enList, total };
  }

  async findCategory() {
    return await this.categoryRepository.find({
      select: ['id', 'title', 'route'],
      order: {
        sort: 'DESC',
      },
    });
  }

  async findOne(id: number) {
    const { userId, categoryId, ...item } =
      await this.encyclopediasRepository.findOne({
        select: [
          'id',
          'title',
          'content',
          'userId',
          'categoryId',
          'reading',
          'coverPicture',
          'createdAt',
        ],
        where: { id },
      });

    return {
      ...item,
      author: await this.userService.getUserInfo(userId),
      category: await this.getCategoryInfo(categoryId),
    };
  }

  update(id: number, updateEncyclopediaDto: UpdateEncyclopediaDto) {
    return `This action updates a #${id} encyclopedia`;
  }

  remove(id: number) {
    return `This action removes a #${id} encyclopedia`;
  }

  getCategoryInfo(id: number) {
    return this.categoryRepository.findOne({
      select: ['id', 'title', 'route'],
      where: { id },
    });
  }
}

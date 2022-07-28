import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '@libs/db/entity/category.entity';
import { Like, Repository, IsNull } from 'typeorm';
import { CategoryInfo, FindCategoryDto } from './interface';
import { PageResult } from 'apps/shared/dto/page.dto';
import { ApiException } from 'apps/shared/exceptions/api.exception';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async find(params: FindCategoryDto): Promise<PageResult<Category>> {
    const { title = '', page = 1, limit = 10 } = params;
    const [list, total] = await this.categoryRepository.findAndCount({
      relations: ['children'],
      skip: limit * (page - 1),
      take: limit,
      where: { title: Like(`%${title}%`), parentId: IsNull() },
      order: { id: 'ASC' },
    });
    return { list, total };
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      select: ['id', 'title'],
      order: { id: 'ASC' },
    });
  }

  async create(data: CategoryInfo) {
    const { title, parentId } = data;
    const existing = await this.categoryRepository.findOneBy({ title });
    if (existing) throw new ApiException(10400, '分类名已存在');
    const parent = await this.categoryRepository.findOneBy({ id: parentId });
    await this.categoryRepository.insert({ title, parent });
  }

  async update(id: number, data: CategoryInfo) {
    const { title } = data;
    const existing = await this.categoryRepository.findOneBy({ title });
    if (existing) throw new ApiException(10400, '分类名已存在');
    await this.categoryRepository.update(id, { title });
  }

  async remove(id: number) {
    await this.categoryRepository.softRemove({ id });
  }
}

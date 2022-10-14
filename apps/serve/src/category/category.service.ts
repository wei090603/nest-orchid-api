import { Category } from '@libs/db/entity/category.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async findTop(): Promise<Category[]>  {
    return await this.categoryRepository.find({
      select: ['id', 'title'],
      where: { parent: null },
      order: { id: 'DESC' },
    })
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find({
      relations: ['children'],
      select: ['id', 'title'],
      where: { parent: null },
      order: { id: 'ASC' },
    })
  }
}

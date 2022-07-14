import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageResult } from 'apps/shared/dto/page.dto';
import { Repository, Like } from 'typeorm';
import { FindUserDto } from './interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async find({
    page = 1,
    limit = 10,
    ...params
  }: FindUserDto): Promise<PageResult<User>> {
    const { account } = params;
    const [list, total] = await this.userRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: { account: Like(`%${account}%`) },
      order: { id: 'DESC' },
    });
    return { list, total };
  }
}

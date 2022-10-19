import { Follow } from '@libs/db/entity/follow.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { Repository } from 'typeorm';
import { FollowDto } from './dto';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(dto: FollowDto, user: User) {
    const { followId } = dto;
    
    const existing = await this.userRepository.findOneBy({ id: followId });
    if (!existing) throw new ApiException(10404, '用户不存在');
    await this.followRepository.insert({ user, follow: existing });
  }

  async delete(id: number, user: User) {
    const collect = await this.followRepository.findOneByOrFail({
      // article: { id },
      // user: { id: user.id },
    });
    await this.followRepository.remove(collect);
  }
}

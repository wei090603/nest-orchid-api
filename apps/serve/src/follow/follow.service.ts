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
    await this.followRepository.insert({
      userId: user.id,
      followId: existing.id,
    });
  }

  async delete(id: number, user: User) {
    const collect = await this.followRepository.findOneByOrFail({
      followId: id,
      userId: user.id,
    });
    await this.followRepository.remove(collect);
  }

  async isMyFollowed(myId: number, userId: number): Promise<Boolean> {
    const num = await this.followRepository.count({
      where: {
        userId: myId,
        followId: userId,
      }
    });
    return !!num;
  }

  // 关注我的用户数量
  async getMyFollowerCount(myUserId: number): Promise<number> {
    const num = await this.followRepository.count({
      where: {
        userId: myUserId,
      },
    });
    return num;
  }

  // 我关注的用户数量
  async getMyFollowederCount(myUserId: number): Promise<number> {
    const num = await this.followRepository.count({
      where: {
        followId: myUserId,
      },
    });
    return num;
  }
}

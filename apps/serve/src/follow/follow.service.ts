import { Follow } from '@libs/db/entity/follow.entity';
import { User } from '@libs/db/entity/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { Repository } from 'typeorm';
import { DynamicService } from '../dynamic/dynamic.service';
import { MessageService } from '../message/message.service';
import { FollowDto } from './dto';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly messageService: MessageService,
    private readonly dynamicService: DynamicService,
  ) {}

  async create(dto: FollowDto, user: User) {
    const { followId } = dto;
    const existing = await this.userRepository.findOneBy({ id: followId });
    if (!existing) throw new ApiException(10404, '用户不存在');
    await this.followRepository.insert({
      userId: user.id,
      followId: existing.id,
    });
    await this.messageService.createFollow(user.id, followId);
    // 记录动态
    this.dynamicService.create({
      type: 2,
      userId: user.id,
      followId,
    });
  }

  async delete(id: number, user: User) {
    const collect = await this.followRepository.findOneByOrFail({
      followId: id,
      userId: user.id,
    });
    await this.followRepository.remove(collect);
  }

  // 查看我是否关注该用户
  async isMyFollowed(myId: number, userId: number): Promise<boolean> {
    const num = await this.followRepository.count({
      where: {
        userId: myId,
        followId: userId,
      },
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

  // 查看关注的列表
  async getFollowList(
    id: number,
    wherekey: 'userId' | 'followId',
    selectKey: 'userId' | 'followId',
  ): Promise<number[]> {
    if (!id) return [];
    const list = await this.followRepository.find({
      select: [selectKey],
      where: {
        [wherekey]: id,
      },
    });
    if (list.length === 0) return [];
    return list?.map((item) => item[selectKey]) || [];
  }
}

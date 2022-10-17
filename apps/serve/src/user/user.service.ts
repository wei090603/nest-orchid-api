import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto, RegisterCode, UpdateUserDto } from './dto';
import { User } from '@libs/db/entity/user.entity';
import { Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// import { EmailService } from '@libs/email';
import { Article } from '@libs/db/entity/article.entity';
import { ApiException } from 'apps/shared/exceptions/api.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  async create(data: CreateUserDto) {
    const { email, password } = data;
    // 检查用户名是否存在
    const existing = await this.userRepository.findOneBy({ email });
    if (existing) throw new ApiException(10400, '该用户已注册');
    // const value = await this.cacheManager.get(email);
    // if (code !== value) throw new ApiException(10400, '验证码错误');
    await this.userRepository.insert({ email, password });
  }

  // 根据用户id获取用户文章列表
  async getArticle(id: number): Promise<Article[]> {
    return await this.articleRepository.find({
      relations: ['tag', 'author', 'category'],
      where: { author: { id } },
      order: {
        isTop: 'DESC',
        id: 'DESC',
      },
    });
  }

  findAll() {
    return `This action returns all user`;
  }

  // 根据用户id获取用户信息及文章
  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneOrFail({
      select: ['nickName', 'account', 'avatar', 'sign', 'createdAt'],
      where: { id },
    });
  }

  // async registerCode({ email }: RegisterCode) {
  //   await this.emailService.sendEmail(email, '倾说：邮箱注册验证码', 'code');
  // }

  // 修改用户信息
  async update(user: User, dto: UpdateUserDto) {
    user.avatar = dto.avatar;
    user.age = dto.age;
    user.position = dto.position;
    user.location = dto.location;
    user.sex = dto.sex;
    user.nickName = dto.nickName;
    await this.userRepository.save(user);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from '@libs/db/entity/notice.entity';
import { Repository, Like } from 'typeorm';
import { CreateNoticDto, FindNoticeDto, NoticeInfo } from './interface';
import { PageResult } from 'apps/shared/dto/page.dto';

@Injectable()
export class NoticeService {
  constructor(
    @InjectRepository(Notice)
    private readonly noticeRepository: Repository<Notice>,
  ) {}

  async findAll({
    page = 1,
    limit = 10,
    ...params
  }: FindNoticeDto): Promise<PageResult<Notice>> {
    const { title = '', createBy = '' } = params;
    const [list, total] = await this.noticeRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: { title: Like(`%${title}%`), createBy: Like(`%${createBy}%`) },
      order: { id: 'DESC' },
    });
    return { list, total };
  }

  async create(data: CreateNoticDto, createBy: string) {
    const { title, type, content } = data;
    await this.noticeRepository.insert({ title, type, content, createBy });
  }

  async update(id: number, data: CreateNoticDto) {
    const { title, type, content } = data;
    await this.noticeRepository.update(id, { title, type, content });
  }

  async findOne(id: number): Promise<NoticeInfo> {
    return await this.noticeRepository.findOneBy({ id });
  }
}

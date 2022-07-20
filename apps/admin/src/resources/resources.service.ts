import { Resources } from '@libs/db/entity/resources.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { initTree } from 'apps/shared/utils';
import { Repository } from 'typeorm';
import { CreateResourceDto, UpdateResourceDto } from './interface';

@Injectable()
export class ResourcesService {
  constructor(
    @InjectRepository(Resources)
    private readonly resourcesRepository: Repository<Resources>,
  ) {}

  async findOneByPath(path: string): Promise<Resources> {
    return await this.resourcesRepository.findOne({ where: { path } });
  }

  /**
   * @Author: tao.wei
   * @description: 添加资源
   * @param {CreateResourceDto} data
   * @return {*}
   */
  async create(data: CreateResourceDto): Promise<void> {
    const { path, type, icon, title, parentId, component, status, sort } = data;
    const existing = await this.findOneByPath(path);
    if (existing) throw new ApiException(10400, '路径已存在');
    // 查询出父级
    const parent = await this.resourcesRepository.findOneBy({ id: parentId });
    await this.resourcesRepository.save({
      path,
      type,
      icon,
      title,
      parent,
      component,
      status,
      sort,
    });
    // 计算父级下存在的子级
    if (parent) {
      const level = await this.resourcesRepository
        .createQueryBuilder()
        .where({ parent })
        .getCount();
      await this.resourcesRepository.update(parent.id, {
        level: level,
      });
    }
  }

  /**
   * @Author: tao.wei
   * @description: 查询所有资源
   * @param {*}
   * @return {*}
   */
  async findAll(): Promise<Resources[]> {
    const data = await this.resourcesRepository.find({
      order: {
        sort: 'ASC',
      },
    });
    return initTree(data);
  }

  async update(id: number, data: UpdateResourceDto): Promise<void> {
    const { path, type, icon, title, component } = data;
    await this.resourcesRepository.update(id, {
      path,
      type,
      icon,
      title,
      component,
    });
  }

  /**
   * @Author: tao.wei
   * @description: 删除菜单
   * @param {number} id
   * @return {*}
   */
  async remove(id: number): Promise<Resources> {
    const resources = await this.resourcesRepository.findOneBy({ id });
    if (resources.level > 0) {
      throw new ApiException(10400, '存在子级不能删除');
    }
    return await this.resourcesRepository.softRemove(resources);
  }
}

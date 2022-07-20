import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Roles } from '@libs/db/entity/roles.entity';
import { Not, Repository } from 'typeorm';
import {
  CommonRoles,
  FindRolesDto,
  ResourcesDto,
  UpdateRoleDto,
} from './interface';
import { PageResult } from 'apps/shared/dto/page.dto';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { Resources } from '@libs/db/entity/resources.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
  ) {}

  async findAll({
    page = 1,
    limit = 10,
    ...params
  }: FindRolesDto): Promise<PageResult<Roles>> {
    const [list, total] = await this.rolesRepository.findAndCount({
      skip: limit * (page - 1),
      take: limit,
      where: params,
      order: { id: 'ASC' },
    });
    return { list, total };
  }

  async list(): Promise<Roles[]> {
    return await this.rolesRepository.find({
      select: ['id', 'roleName'],
      order: { id: 'DESC' },
    });
  }

  async create(data: CommonRoles): Promise<void> {
    const { roleName, mark, remark } = data;
    await this.findOneByAccount(roleName);
    await this.rolesRepository.insert({
      roleName,
      mark,
      remark,
    });
  }

  // 检查账号是否存在
  async findOneByAccount(roleName: string) {
    const existing = await this.rolesRepository.findOneBy({ roleName });
    if (existing) throw new ApiException(10400, '角色已存在');
  }

  // 查询当前角色权限
  async roleMenu(id: number): Promise<number[]> {
    const { resourcesId } = await this.rolesRepository
      .createQueryBuilder('roles')
      .leftJoinAndSelect('roles.resources', 'resources')
      .select('GROUP_CONCAT(resources.id)', 'resourcesId')
      .where('roles.id = :id', { id })
      .getRawOne();
    return resourcesId?.split(',').map(Number) ?? [];
  }

  async remove(id: number) {
    await this.rolesRepository.softRemove({ id });
  }

  async update(id: number, data: UpdateRoleDto): Promise<void> {
    const { roleName, remark, mark } = data;
    const existing = await this.rolesRepository.findOne({
      where: { roleName: data.roleName, id: Not(id) },
    });
    if (existing) throw new ApiException(10400, '角色名已存在');
    const roles = new Roles();
    roles.roleName = data.roleName;
    roles.remark = data.remark;
    await this.rolesRepository.update(id, {
      roleName,
      remark,
      mark,
    });
  }

  // 角色 修改权限
  async resources(id: number, data: ResourcesDto): Promise<void> {
    const { resourcesId } = data;
    // 根据id 查询资源模型
    const resources = await this.rolesRepository
      .createQueryBuilder('resources')
      .where('resources.id IN (:...ids)', { ids: resourcesId })
      .getMany();
    await this.rolesRepository.save({
      id,
      resources,
    });
  }
}

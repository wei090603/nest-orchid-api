import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from '@libs/db/entity/manager.entity';
import { Like, Repository, In } from 'typeorm';
import { hashSync } from 'bcryptjs';
import { CreateManagerDto, FindManagerDto } from './interface';
import { Roles } from '@libs/db/entity/roles.entity';
import { PageResult } from 'apps/shared/dto/page.dto';
import { ApiException } from 'apps/shared/exceptions/api.exception';
import { Resources } from '@libs/db/entity/resources.entity';
import { initTree } from 'apps/shared/utils';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
    @InjectRepository(Roles)
    private readonly rolesRepository: Repository<Roles>,
    @InjectRepository(Resources)
    private readonly resourcesRepository: Repository<Resources>,
  ) {}

  async findAll(params: FindManagerDto): Promise<PageResult<Manager>> {
    const {
      page = 1,
      limit = 10,
      account = '',
      name = null,
      phone = null,
    } = params;
    const [list, total] = await this.managerRepository.findAndCount({
      relations: ['roles'],
      skip: limit * (page - 1),
      take: limit,
      where: {
        account: Like(`%${account}%`),
        name: name ? Like(`%${name}%`) : name,
        phone: phone ?  Like(`%${phone}%`) : phone
      },
      order: { id: 'DESC' },
    });
    return { list, total };
  }

  async create(data: CreateManagerDto) {
    const { account, email, name, remark, phone, roles } = data;
    await this.findOneByAccount(account);
    const result = await this.managerRepository.save({
      account,
      email,
      name,
      remark,
      phone,
    });
    const role = await this.rolesRepository.findBy({
      id: In(roles),
    });
    await this.managerRepository.save({
      id: result.id,
      roles: role,
    });
    // const rolesList = await getManager().createQueryBuilder(Roles, "roles").where('roles.id IN (:...ids)', { ids: roles }).getMany();
  }

  async updated(id: number, data: CreateManagerDto) {
    const { email, name, phone, remark, roles } = data;
    const role = await this.rolesRepository.findBy({
      id: In(roles),
    });
    await this.managerRepository.update(id, {
      email,
      name,
      phone,
      remark,
    });
    await this.managerRepository.save({
      id,
      roles: role,
    });
  }

  async updateStatus(id: number) {
    const existing = await this.managerRepository.findOneBy({ id });
    await this.managerRepository.update(id, {
      status: !existing.status,
    });
  }

  async restPassword(id: number) {
    await this.managerRepository.update(id, { password: hashSync('123456') });
  }

  async remove(id: number) {
    await this.managerRepository.softRemove({ id });
  }

  // ????????????????????????
  async findOneByAccount(account: string) {
    const existing = await this.managerRepository.findOneBy({ account });
    if (existing) throw new ApiException(10400, '???????????????');
  }

  async resources(roles: any[]) {
    const roleId: number[] = roles.map((item: any) => item.id);
    if (roleId.includes(1)) {
      // ???????????????
      const data = await this.resourcesRepository.find({
        where: { type: 'menu' },
        order: {
          sort: 'ASC',
        },
      });
      return initTree(data);
    } else {
      const data = await this.rolesRepository
        .createQueryBuilder('roles')
        .leftJoinAndSelect(
          'roles.resources',
          'resources',
          "resources.type = 'menu'",
        )
        .select('roles.id')
        .addSelect('resources')
        .where('roles.id IN (:...ids)', { ids: roleId })
        .orderBy('resources.id', 'DESC')
        .getMany();
      const resourcesList = data.map((item: Roles) => item.resources);
      // const resources = resourcesList.reduce((a: any[], b: any) => a.concat(b) ); // ???????????????????????????
      const newArr = resourcesList.flat();
      return initTree(newArr);
    }
  }
}

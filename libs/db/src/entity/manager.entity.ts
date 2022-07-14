import {
  Entity,
  Column,
  OneToMany,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Base } from './base.entity';
// import { LoginLogger } from './loginLogger.entity';
// import { Roles } from './roles.entity';
import { hashSync } from 'bcryptjs';

@Entity('manager')
export class Manager extends Base {
  @Column('varchar', {
    unique: true,
    name: 'account',
    length: 32,
    comment: '用户登录账号',
  })
  public account: string;

  @Column('varchar', {
    length: 200,
    name: 'password',
    comment: '用户登录密码',
    select: false,
    default: hashSync('123456'),
  })
  public password: string;

  @Column('varchar', {
    length: 32,
    name: 'name',
    comment: '用户显示的名称',
  })
  public name: string;

  @Column('varchar', {
    length: 11,
    name: 'phone',
    comment: '用户手机号码',
    nullable: true,
  })
  public phone: string;

  @Column('varchar', {
    nullable: true,
    length: 200,
    name: 'email',
    comment: '邮箱地址',
  })
  public email: string;

  @Column('text', {
    nullable: true,
    comment: '用户备注信息',
    name: 'remark',
  })
  public remark: string;

  @Column('varchar', {
    length: 300,
    default:
      'https://img1.baidu.com/it/u=2716398045,2043787292&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=800',
    name: 'avatar',
    comment: '头像地址',
  })
  public avatar: string;

  @Column('boolean', {
    default: true,
    comment: '所属状态是否有效',
    name: 'status',
  })
  public status: boolean;

  // @ManyToMany(() => Roles, (roles) => roles.manager)
  // public roles: Roles[];

  // @OneToMany(() => LoginLogger, (loginLogger) => loginLogger.manager) // 将另一面指定为第二个参数
  // public loginLogger: LoginLogger;
}

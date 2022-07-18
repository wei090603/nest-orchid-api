import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { Base } from './base.entity';
import { Manager } from './manager.entity';

@Entity('login_logger')
export class LoginLogger extends Base {
  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    name: 'login_ip',
    comment: '登录ip',
  })
  public loginIp: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    name: 'login_address',
    comment: '登录地址',
  })
  public loginAddress: string;

  @ManyToOne(() => Manager, manager => manager.loginLogger) // 将另一面指定为第二个参数
  @JoinColumn({name: 'manager_id'})
  public manager: Manager;

}


import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Base } from './base.entity';
import { Manager } from './manager.entity';
import { Resources } from './resources.entity';
// import { Resources } from './resources.entity';

@Entity('roles')
export class Roles extends Base {
  @Column({
    type: 'varchar',
    unique: true,
    length: 200,
    name: 'role_name',
    comment: '角色名称'
  })
  public roleName: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 50,
    name: 'mark',
    comment: '角色标识'
  })
  public mark: string;

  @Column({
    type: 'varchar',
    length: 200,
    name: 'remark',
    comment: '角色描述'
  })
  public remark: string;

  @ManyToMany(() => Resources,  resources=> resources.roles)
  @JoinTable({ 
    name: 'roles_resources', 
    joinColumn: {
      name: "roles_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "resources_id",
      referencedColumnName: "id"
    }
  })
  public resources: Resources[];

  @ManyToMany(() => Manager, (manager) => manager.roles)
  @JoinTable({ name: 'manager_roles' })
  manager: Manager[];

}

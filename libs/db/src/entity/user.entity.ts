import { Entity, Column, OneToMany, JoinColumn, ManyToMany } from 'typeorm';
import { Base } from './base.entity';
import { Article } from './article.entity';
// import { ArticleLike } from './articleLike.entity';
// import { Collect } from './collect.entity';
// import { UserTag } from './userTag.entity';

@Entity('user')
export class User extends Base {
  @Column('varchar', {
    unique: true,
    nullable: true,
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
  })
  public password: string;

  @Column('varchar', {
    length: 32,
    nullable: true,
    name: 'nick_name',
    comment: '用户显示昵称',
  })
  public nickName: string;

  @Column('varchar', {
    unique: true,
    nullable: true,
    length: 11,
    name: 'mobile',
    comment: '用户手机号码',
  })
  public phoneNum: string;

  @Column('varchar', {
    unique: true,
    nullable: true,
    length: 200,
    name: 'email',
    comment: '邮箱地址',
  })
  public email: string;

  @Column('int', {
    name: 'favs',
    default: 0,
    comment: '积分',
  })
  public favs: number;

  @Column('int', {
    name: 'sign_in_count',
    default: 0,
    comment: '签到次数',
  })
  public signInCount: number;

  @Column('int', {
    name: 'age',
    default: 0,
    comment: '年龄',
  })
  public age: number;

  @Column('boolean', {
    name: 'sex',
    comment: '性别 0-男 1-女',
    default: true,
  })
  public sex: boolean;

  @Column('varchar', {
    name: 'date_birth',
    nullable: true,
    default: '',
    comment: '出生日期',
  })
  public dateBirth: number;

  @Column('boolean', {
    name: 'position',
    comment: '是否允许获取位置',
    default: true,
  })
  public position: boolean;

  @Column('varchar', {
    nullable: true,
    length: 200,
    name: 'location',
    comment: '城市',
  })
  public location: string;

  @Column('varchar', {
    nullable: true,
    length: 100,
    name: 'sign',
    comment: '个性签名',
  })
  public sign: string;

  @Column('boolean', {
    name: 'vip',
    comment: '是否会员',
    default: false,
  })
  public vip: boolean;

  @Column('varchar', {
    length: 200,
    name: 'avatar',
    comment: '头像地址',
  })
  public avatar: string;

  @Column('varchar', {
    nullable: true,
    length: 200,
    name: 'open_id',
    comment: '微信用户openid',
  })
  public openId: string;

  @Column('boolean', {
    default: true,
    comment: '所属状态是否有效',
    name: 'status',
  })
  public status: boolean;

  @OneToMany(() => Article, (article) => article.author)
  public article: Article[];

  // @OneToMany(() => ArticleLike, (like) => like.user)
  // @JoinColumn({ name: 'article_like' })
  // public articleLike: ArticleLike[];

  // @OneToMany(() => Collect, (collect) => collect.user)
  // public collect: Collect[];

  // @ManyToMany(() => UserTag, (userTag) => userTag.user)
  // public userTag: UserTag[];
}

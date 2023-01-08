import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Base } from './base.entity';

// 动态
@Entity({ name: 'dynamic' })
export class Dynamic extends Base {
  type: number;

  userId: number;

  articleId: number;

  followId: number;
}

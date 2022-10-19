import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Article } from './article.entity';
import { Base } from './base.entity';
import { User } from './user.entity';



// 动态
@Entity({ name: 'dynamic' })
export class Dynamic extends Base {
  
}

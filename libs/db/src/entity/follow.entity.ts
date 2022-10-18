import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Article } from './article.entity';
import { Base } from './base.entity';
import { User } from './user.entity';

// 关注
@Entity({ name: 'follow' })
export class Follow extends Base {
  @OneToOne(() => Article)
  @JoinColumn({ name: 'article_id' })
  public article: Article;

  @ManyToOne(() => User, (user) => user.follow)
  @JoinColumn({ name: 'user_id' })
  public user: User;
}

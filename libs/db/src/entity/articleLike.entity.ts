import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

// 关注
@Entity({ name: 'article_like' })
export class ArticleLike {
  @PrimaryColumn({
    type: 'int',
    name: 'article_id',
    comment: '点赞文章id',
  })
  @Index()
  public articleId: number;

  @PrimaryColumn({
    type: 'int',
    name: 'user_id',
    comment: '当前用户id',
  })
  @Index()
  public userId: number;
}

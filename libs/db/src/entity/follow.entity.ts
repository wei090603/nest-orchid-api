import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

// 关注
@Entity({ name: 'follow' })
export class Follow {
  @PrimaryColumn({
    type: 'int',
    name: 'follow_id',
    comment: '关注的用户id',
  })
  @Index()
  public followId: number;

  @PrimaryColumn({
    type: 'int',
    name: 'user_id',
    comment: '当前用户id',
  })
  @Index()
  public userId: number;
}

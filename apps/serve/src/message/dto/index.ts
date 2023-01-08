import { PageOptionsDto } from 'apps/shared/dto/page.dto';

export class FindMsgListDto extends PageOptionsDto {}

export class CommentDto {
  commentId: number;
  userId: number;
  cId: number;
  articleId: number;
}

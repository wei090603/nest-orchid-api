import { Column, Entity } from 'typeorm';
import { Base } from './base.entity';

// 视频
@Entity({ name: 'video' })
export class Video extends Base {}

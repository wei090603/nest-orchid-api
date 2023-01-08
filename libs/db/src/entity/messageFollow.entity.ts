import { Column, Entity } from 'typeorm';
import { MessageBase } from './messageBase.entity';

// 关注消息
@Entity({ name: 'message_follow' })
export class MessageFollow extends MessageBase {}

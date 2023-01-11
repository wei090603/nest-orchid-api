import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'question' })
export class Question extends Base {}

import { Entity, Column } from 'typeorm';
import { Base } from './base.entity';

@Entity({ name: 'activity' })
export class Activity extends Base {}

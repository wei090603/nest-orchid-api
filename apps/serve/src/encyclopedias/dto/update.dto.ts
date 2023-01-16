import { PartialType } from '@nestjs/swagger';
import { CreateEncyclopediaDto } from './create.dto';

export class UpdateEncyclopediaDto extends PartialType(CreateEncyclopediaDto) {}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { EncyclopediasService } from './encyclopedias.service';
import { CreateEncyclopediaDto } from './dto/create.dto';
import { UpdateEncyclopediaDto } from './dto/update.dto';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageResult } from 'apps/shared/dto/page.dto';
import { PageEncyclopediaList, FindEncyclopediaDto } from './dto/find.dto';
import { Encyclopedias } from '@libs/db/entity/encyclopedias.entity';

@ApiTags('百科管理')
@Controller('encyclopedias')
export class EncyclopediasController {
  constructor(private readonly encyclopediasService: EncyclopediasService) {}

  @Post()
  create(@Body() createEncyclopediaDto: CreateEncyclopediaDto) {
    return this.encyclopediasService.create(createEncyclopediaDto);
  }

  @Get()
  @ApiOkResponse({ type: [PageEncyclopediaList] })
  @ApiOperation({ summary: '获取百科文章列表' })
  async findAll(
    @Query() query: FindEncyclopediaDto,
  ): Promise<PageEncyclopediaList> {
    return this.encyclopediasService.findAll(query);
  }

  @Get('category')
  findCategory() {
    return this.encyclopediasService.findCategory();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.encyclopediasService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEncyclopediaDto: UpdateEncyclopediaDto,
  ) {
    return this.encyclopediasService.update(+id, updateEncyclopediaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.encyclopediasService.remove(+id);
  }
}

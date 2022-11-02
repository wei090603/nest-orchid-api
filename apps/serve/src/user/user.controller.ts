/*
 * @Description:
 * @Author: tao.wei
 * @Date: 2021-09-18 16:27:24
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, RegisterCode, UpdateUserDto, UserInfoDto } from './dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'apps/shared/guards/guard.strategy';
import { user } from 'apps/shared/decorators/user.decorator';
import { User } from '@libs/db/entity/user.entity';
import { OptionAuthGuard } from 'apps/shared/guards/option.strategy';
import { FollowService } from '../follow/follow.service';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly followService: FollowService,
  ) {}

  @Post()
  @ApiOperation({ summary: '用户注册', description: '用户注册' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // @Post('code')
  // @ApiOperation({ summary: '注册获取验证码', description: '注册获取验证码' })
  // registerCode(@Body() registerCode: RegisterCode) {
  //   return this.userService.registerCode(registerCode);
  // }

  // @Get('tag')
  // @ApiOperation({ description: '获取当前用户标签', summary: '获取当前用户标签' })
  // // 此接口需要传递token;
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // getTag(@user() user: User) {
  //   return this.userService.getTag(user);
  // }

  // @Patch('tag')
  // @ApiOperation({ description: '更新当前用户标签', summary: '更新当前用户标签' })
  // // 此接口需要传递token;
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // updateTag(@Body() tag: UpdateUserTagDto, @user() user: User) {
  //   return this.userService.updateTag(tag, user);
  // }

  @Get('article/:id')
  @ApiOperation({
    description: '根据用户id获取文章',
    summary: '根据用户id获取文章',
  })
  getArticle(@Param('id') id: string) {
    return this.userService.getArticle(+id);
  }

  @Get('collect/:id')
  @ApiOperation({
    description: '根据用户id获取收藏列表',
    summary: '根据用户id获取收藏列表',
  })
  getCollect(@Param('id') id: string) {
    return this.userService.getCollect(+id);
  }

  @Get('like/:id')
  @ApiOperation({
    description: '根据用户id获取点赞列表',
    summary: '根据用户id获取点赞列表',
  })
  getLike(@Param('id') id: string) {
    return this.userService.getLike(+id);
  }

  @Get('follow/:id')
  @ApiOperation({
    description: '根据用户id获取关注列表',
    summary: '根据用户id获取关注列表',
  })
  @UseGuards(OptionAuthGuard)
  getFollow(
    @Param('id') id: string,
    @Query('type') type: string,
    @user() user: User,
  ) {
    return this.userService.getFollow(+id, +type, user);
  }

  @Get(':id')
  // @UseInterceptors(ClassSerializerInterceptor) // 不返回密码 使用注册dto
  @ApiOperation({
    summary: '获取用户详情信息',
    description: '获取用户详情信息',
  })
  @UseGuards(OptionAuthGuard)
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @user() user: User,
  ): Promise<UserInfoDto> {
    // followNum: 自己关注的人数
    // followedNum: 关注自己的人数
    const [userInfo, followNum, followedNum] = await Promise.all([
      this.userService.findOne(id),
      this.followService.getMyFollowerCount(id),
      this.followService.getMyFollowederCount(id),
    ]);
    const userInfoDto = {
      ...userInfo,
      followedNum,
      followNum,
    } as UserInfoDto;
    return userInfoDto;
  }

  // @Patch()
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @ApiOperation({ summary: '修改用户信息', description: '修改用户信息' })
  // update(@user() user: User, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(user.id, updateUserDto);
  // }
}

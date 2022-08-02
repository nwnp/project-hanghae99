import { CurrentUsersService } from './../services/current.service';
import { Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('범인 투표 API')
@Controller('api')
export class CurrentController {
  constructor(private readonly currentUsersService: CurrentUsersService) {}

  // @Get('/:id')
  // test(@Param('id') id: number) {
  //   return this.currentUsersService.currentUsers(id);
  // }

  @ApiOperation({
    summary: '범인 투표 API',
    description:
      '게임룸에서 최종 범인 투표하기',
  })
  @ApiParam({ name: 'votedUserId', required: true })
  @ApiBearerAuth('access-token')
  @Post('/vote/:votedUserId')
  vote(@Param('votedUserId') votedUserId: string) {
    return this.currentUsersService.vote(+votedUserId);
  }
}

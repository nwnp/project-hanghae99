import { JwtAuthGuard } from './../../auth/jwt/jwt.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateRoomDto } from '../dto/create.room.dto';
import { RoomsService } from '../services/rooms.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('게임룸 API')
@Controller('api')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/room/create')
  @ApiOperation({
    summary: '게임룸 만들기 API',
    description:
      '제목, 패스워드, 힌트 찾는 시간, 추리 시간, 역할 선택 방식을 통해 게임룸 만들기',
  })
  @ApiBearerAuth('access-token')
  roomCreate(@Body() body: CreateRoomDto, @Req() req) {
    const master = req.user.nickname;
    return this.roomsService.createRoom(body, master);
  }

  @Put('/room/update/:roomId')
  @ApiOperation({
    summary: '게임룸 수정 API',
    description:
      '제목, 패스워드, 힌트 찾는 시간, 추리 시간, 역할 선택 방식 데이터를 받아 게임룸 수정하기',
  })
  @ApiBody({
    schema: {
      properties: {
        title: { type: 'string', example: '방1수정', description: '제목' },
        password: { type: 'string', example: '12345', description: '비밀번호' },
        hintTime: { type: 'string', example: '20', description: '힌트 찾는 시간' },
        reasoningTime: { type: 'string', example: '20', description: '추리 시간' },
        isRandom: { type: 'string', example: 'random', description: '역할 선택 방식' },
      },
    },
  })
  @ApiParam({ name: 'roomId', required: true,})
  @ApiBearerAuth('access-token')
  roomUpdate(@Param('roomId') id: string, @Body() body) {
    return this.roomsService.updateRoom(parseInt(id), body);
  }

  @ApiOperation({
    summary: '게임룸 삭제 API',
    description:
      '게임룸 삭제하기',
  })
  @ApiParam({ name: 'roomId', required: true,})
  @ApiBearerAuth('access-token')
  @Delete('/room/delete/:roomId')
  roomDelete(@Param('roomId') id: string) {
    return this.roomsService.deleteRoom(parseInt(id));
  }

  @ApiOperation({
    summary: '게임룸 전체 목록 API',
    description:
      '게임룸 전체 목록 보여주기',
  })
  @ApiBearerAuth('access-token')
  @Get('/room/list')
  roomGetAll() {
    return this.roomsService.getAllRoom();
  }

  @ApiOperation({
    summary: '게임룸 검색 API',
    description:
      '게임룸 방제목, 방장으로 검색하기',
  })
  @ApiQuery({ name: 'type', description: '방제목(TITLE), 방장(NICKNAME)', required: true })
  @ApiQuery({ name: 'inputValue', description: '검색 키워드', required: true })
  @ApiBearerAuth('access-token')
  @Get('/room/search')
  roomSearch(@Query() query) {
    return this.roomsService.searchRoom(query);
  }

  @ApiOperation({
    summary: '게임룸 비밀번호 체크 API',
    description:
      '게임룸 비밀번호 체크하기',
  })
  @ApiParam({ name: 'roomId', required: true,})
  @ApiBody({
    schema: {
      properties: {
        password: { type: 'string', example: '1234', description: '비밀번호' },
      },
    },
  })
  @ApiBearerAuth('access-token')
  @Post('/room/chkpassword/:roomId')
  roomChkPassword(@Param('roomId') id: string, @Body() body) {
    return this.roomsService.chkPasswordRoom(parseInt(id), body);
  }

  @ApiOperation({
    summary: '강퇴당한 유저 저장하기 API',
    description:
      '게임룸에서 강퇴당한 유저 저장하기',
  })
  @ApiParam({ name: 'roomId', required: true,})
  @ApiBody({
    schema: {
      properties: {
        userId: { type: 'string', example: '1', description: '유저의 id값' },
      },
    },
  })
  @ApiBearerAuth('access-token')
  @Put('/room/ban/:roomId')
  roomBanUser(@Param('roomId') id: string, @Body() body) {
    return this.roomsService.banUsers(parseInt(id), body.userId);
  }
}

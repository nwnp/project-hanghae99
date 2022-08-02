import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ example: '방1', description: '방 제목', required: true })
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '1234', description: '방 비밀번호' })
  @IsString()
  password: string;

  @ApiProperty({ example: '10', description: '게임 힌트 찾는 시간' })
  @IsNotEmpty()
  hintTime: string;

  @ApiProperty({ example: '10', description: '게임 추리 시간' })
  @IsNotEmpty()
  reasoningTime: string;

  @ApiProperty({ example: 'random', description: '역할 선택 방식(random, )' })
  @IsNotEmpty()
  isRandom: string;
}

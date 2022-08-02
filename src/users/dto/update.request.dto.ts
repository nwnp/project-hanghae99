import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: '1234수정', description: '비밀번호'})
  @IsString()
  password: string;

  @ApiProperty({ example: '닉네임수정', description: '닉네임'})
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'profile.jpg', description: '프로필'})
  @IsString()
  imageUrl: string;
}

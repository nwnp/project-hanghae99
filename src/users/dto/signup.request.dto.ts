import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignupUserDto {
  @ApiProperty({ example: 'Detective', description: '닉네임', required: true })
  @IsString()
  nickname: string;

  @ApiProperty({ example: 'test@email.com', description: '이메일', required: true })
  @IsString()
  email: string;

  @ApiProperty({ example: '1234', description: '비밀번호', required: true })
  @IsString()
  password: string;

  @ApiProperty({ example: '1234', description: '비밀번호 확인', required: true })
  @IsString()
  passwordCheck: string;
}

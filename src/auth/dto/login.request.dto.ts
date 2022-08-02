import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ example: 'test@email.com', description: '이메일', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234', description: '비밀번호', required: true })
  @IsString()
  password: string;
}

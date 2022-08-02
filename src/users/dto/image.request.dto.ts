import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ImageRegisterDto {
  @ApiProperty({ example: 'profile.png', description: '프로필', required: true })
  @IsString()
  imageUrl: string;
}

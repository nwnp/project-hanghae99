import { AuthService } from './../../auth/auth.service';
import { UsersService } from './../services/users.service';
import { HttpExceptionFilter } from '../../common/exceptions/http-exception.filter';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseFilters,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SignupUserDto } from '../dto/signup.request.dto';
import { LoginUserDto } from 'src/auth/dto/login.request.dto';
import { ImageRegisterDto } from '../dto/image.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('유저 API')
@Controller('api')
@UseFilters(new HttpExceptionFilter())
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('/signup')
  @ApiOperation({
    summary: '회원가입 API',
    description:
      '닉네임, 이메일, 비밀번호, 비밀번호 확인을 통해 유저의 회원가입',
  })
  signup(@Body(new ValidationPipe()) body: SignupUserDto) {
    return this.usersService.signup(body);
  }

  @Post('/local/login')
  @ApiOperation({
    summary: '로그인 API',
    description: '이메일과 비밀번호를 통해 로그인',
  })
  login(@Body() body: LoginUserDto) {
    return this.authService.jwtLogin(body);
  }

  @Post('/login')
  @ApiOperation({
    summary: '소셜로그인 API',
    description: '이메일과 닉네임음 통해 소셜로그인',
  })
  socialLogin(@Body() body) {
    return this.usersService.socialSignup(body);
  }

  @Put('/mypage/update')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ 
    summary: '마이페이지 수정 API',
    description: '마이페이지 수정하기'
  })
  @ApiBearerAuth('access-token')
  @ApiBody({
    schema: {
      properties: {
        // email: { type: 'string', example: 'test@email.com', description: '비밀번호' },
        password: { type: 'string', example: '1234', description: '비밀번호' },
        nickname: { type: 'string', example: '나는탐정', description: '닉네임' },
        imageUrl: { type: 'string', example: 'profile.jpg', description: '프로필' },
      },
    },
  })
  mypageUpdate(@Body() body, @Req() req) {
    return this.usersService.userUpdate(req.user.id, body);
  }

  @Get('/mypage')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '마이페이지 API',
    description: '로그인 한 유저의 마이페이지 보여주기',
  })
  @ApiBearerAuth('access-token')
  mypage(@Req() req) {
    console.log(req.user, typeof req.user.sub);
    return this.usersService.getUser(req.user.sub);
  }

  @ApiOperation({
    summary: '마이페이지 프로필 저장 API',
    description:
      '마이페이지 프로필 저장하기',
  })
  @ApiBearerAuth('access-token')
  @Post('/mypage/image')
  @UseGuards(JwtAuthGuard)
  imageRegister(@Req() req, @Body() body: ImageRegisterDto) {
    return this.usersService.image(req.user.sub, body);
  }

  @Get('/test/:id')
  test(@Param('id') id: number) {
    return this.usersService.test(id);
  }
}

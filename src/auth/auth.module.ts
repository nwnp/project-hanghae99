import { jwtConstants } from './jwt/constants';
import { UsersModule } from './../users/users.module';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './jwt/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login.request.dto';

@Module({
  imports: [
    ConfigModule.forRoot(),
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  providers: [AuthService, LocalStrategy, LoginUserDto],
  exports: [AuthService, LoginUserDto],
})
export class AuthModule {}

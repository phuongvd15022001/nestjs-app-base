import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from 'src/modules/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { GLOBAL_CONFIG } from 'src/configs/global.config';
import { MailModule } from 'src/services/mail/mail.module';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    MailModule,
    JwtModule.register({
      secret: GLOBAL_CONFIG.security.jwt_secret,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtRefreshStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

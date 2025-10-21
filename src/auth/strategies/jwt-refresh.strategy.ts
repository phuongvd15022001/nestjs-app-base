import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { AuthHelpers } from 'src/shared/helpers/auth.helpers';
import { GLOBAL_CONFIG } from 'src/configs/global.config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      secretOrKey: GLOBAL_CONFIG.security.jwt_secret as string,
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request & { body: { refreshToken: string } },
    payload: { sub: number; email: string },
  ) {
    const user = await this.authService.getInfo(payload.sub);

    if (!user || !user.refreshToken)
      throw new UnauthorizedException('User or Refresh Token not found');

    const refreshToken = req.body.refreshToken;

    const tokenMatches = await AuthHelpers.verify(
      refreshToken,
      user.refreshToken,
    );

    if (!tokenMatches)
      throw new UnauthorizedException('Refresh Token mismatch');

    return user;
  }
}

import {
  Controller,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local.guard';
import { JwtRefreshAuthGuard } from './guard/jwt-refresh.guard';
import { User } from '@prisma/client';
import { LoginDto } from './dto/request/login.dto';
import { RefreshTokenDto } from './dto/request/refesh-token.dto';
import { AuthResponseDto } from './dto/response/auth.response.dto';
import { TransformInterceptor } from 'src/shared/interceptors/transform.interceptor';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @UseInterceptors(new TransformInterceptor(AuthResponseDto))
  @Post('login')
  @ApiBody({ type: LoginDto })
  @ApiOkResponse({ type: AuthResponseDto })
  async login(@Request() req: Request & { user: User }) {
    const user = req.user;
    return this.authService.login(user);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @UseInterceptors(new TransformInterceptor(AuthResponseDto))
  @Post('refresh')
  @ApiBody({ type: RefreshTokenDto })
  @ApiOkResponse({ type: AuthResponseDto })
  async refreshTokens(@Request() req: Request & { user: User }) {
    const user = req.user;
    return this.authService.login(user);
  }
}

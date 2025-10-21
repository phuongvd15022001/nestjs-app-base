import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ERole } from 'src/shared/constants/global.constants';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  roles: string[];

  constructor(private reflector: Reflector) {
    super(reflector);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context.switchToHttp().getRequest<{ roles?: string[] }>();

    if (roles?.includes(ERole.PUBLIC)) {
      return true;
    } else {
      request.roles = roles;
    }

    return super.canActivate(context);
  }
}

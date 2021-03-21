import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  //This function is only used if any complex operation is to performed apart from comparing.
  //   matchRoles(roles: string[], userRoles: string[]): boolean {
  //     return roles === userRoles;
  //   }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return false;
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return roles === user.roles; //returns true if matches the roles
  }
}

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { VALID_TOKEN } from '../constants/auth';

@Injectable()
// TODO: unauth, not forbidden!!
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.cookie?.match(/AUTH_TOKEN=(.+?);/)?.[1];
    return token && token === VALID_TOKEN;
  }
}

import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { VALID_TOKEN } from '../../constants/credentials';

@Injectable()
export class AuthnGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-auth-token'];
    // TODO: move to service
    const isValid = token && token === VALID_TOKEN;
    if (!isValid) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}

import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ValidateTokenService } from '../../validate-token/validate-token.service';

@Injectable()
export class AuthnGuard implements CanActivate {
  constructor(
    @Inject(ValidateTokenService)
    private validateTokenService: ValidateTokenService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-auth-token'];
    if (!this.validateTokenService.isValid(token)) {
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}

import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthnGuard implements CanActivate {
  private readonly logger = new Logger(AuthnGuard.name);
  constructor(
    @Inject(AuthService)
    private authService: AuthService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-auth-token'];
    if (!this.authService.checkIsValid(token)) {
      this.logger.log(`Attempt to access path="${request.path}" w/o token.`);
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}

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
    const isTokenValid = this.authService.checkIsValid(token);
    if (!isTokenValid) {
      this.logger.log(
        `Attempt to access path="${request.path}", token is missing or invalid.`,
      );
      throw new UnauthorizedException('Unauthorized');
    }
    this.logger.log(
      `Attempt to access path="${request.path}", token is valid.`,
    );
    return true;
  }
}

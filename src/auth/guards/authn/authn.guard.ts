import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ValidateTokenService } from '../../services/validate-token/validate-token.service';

@Injectable()
export class AuthnGuard implements CanActivate {
  private readonly logger = new Logger(AuthnGuard.name);
  constructor(
    @Inject(ValidateTokenService)
    private validateTokenService: ValidateTokenService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['x-auth-token'];
    if (!this.validateTokenService.checkIsValid(token)) {
      this.logger.log(`Attempt to access path="${request.path}" w/o token.`);
      throw new UnauthorizedException('Unauthorized');
    }
    return true;
  }
}

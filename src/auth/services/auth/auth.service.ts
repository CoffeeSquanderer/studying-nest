import { Injectable, Logger } from '@nestjs/common';
import { VALID_TOKEN } from '../../constants/credentials';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  generateToken(login: string) {
    this.logger.log(`"Generating" new token for login="${login}".`);
    return VALID_TOKEN;
  }

  checkIsValid(token: string) {
    const isValid = token && token === VALID_TOKEN;
    return isValid;
  }
}

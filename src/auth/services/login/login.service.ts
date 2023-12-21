import { Injectable, Logger } from '@nestjs/common';
import { VALID_TOKEN } from '../../constants/credentials';

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);

  generateToken(login: string) {
    this.logger.log(`"Generating" new token for login="${login}".`);
    return VALID_TOKEN;
  }
}

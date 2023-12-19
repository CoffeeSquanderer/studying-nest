import { Injectable, Logger } from '@nestjs/common';
import {
  VALID_LOGIN,
  VALID_PW,
  VALID_TOKEN,
} from '../../constants/credentials';

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);

  checkCredentials(login: string, password: string) {
    const isLoginValid = login === VALID_LOGIN;
    if (!isLoginValid) {
      this.logger.log(
        `Attempting to log in as login="${login}", user does not exist.`,
      );
      return false;
    }
    this.logger.log(`Attempting to log in for login="${login}".`);
    const areCredsValid = isLoginValid && password === VALID_PW;
    this.logger.log(
      `${
        areCredsValid ? 'Successful' : 'Unsuccessful'
      } login for login="${login}".`,
    );
    return areCredsValid;
  }

  generateToken(login: string) {
    this.logger.log(`"Generating" new token for login="${login}".`);
    return VALID_TOKEN;
  }
}

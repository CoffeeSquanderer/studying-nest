import { Injectable } from '@nestjs/common';
import {
  VALID_LOGIN,
  VALID_PW,
  VALID_TOKEN,
} from '../../constants/credentials';

@Injectable()
export class LoginService {
  checkCredentials(login: string, password: string) {
    return login !== VALID_LOGIN || password !== VALID_PW;
  }

  generateToken() {
    return VALID_TOKEN;
  }
}

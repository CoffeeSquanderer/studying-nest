import { Injectable } from '@nestjs/common';
import { VALID_TOKEN } from '../../constants/credentials';
import { Log } from 'src/utils/log.decorator';

@Injectable()
export class AuthService {
  @Log('AuthService')
  generateToken() {
    return VALID_TOKEN;
  }

  @Log('AuthService')
  checkIsValid(token: string) {
    const isValid = token && token === VALID_TOKEN ? true : false;
    return isValid;
  }
}

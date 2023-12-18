import { Injectable } from '@nestjs/common';
import { VALID_TOKEN } from '../constants/credentials';

@Injectable()
export class ValidateTokenService {
  public isValid(token: string) {
    return token && token === VALID_TOKEN;
  }
}

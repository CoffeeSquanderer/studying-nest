import { Injectable } from '@nestjs/common';
import { VALID_TOKEN } from '../../constants/credentials';

@Injectable()
export class ValidateTokenService {
  public checkIsValid(token: string) {
    const isValid = token && token === VALID_TOKEN;
    return isValid;
  }
}

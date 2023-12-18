import { ValidateTokenService } from 'src/auth/validate-token/validate-token.service';
import { AuthnGuard } from './authn.guard';

describe('AuthnGuard', () => {
  it('should be defined', () => {
    expect(new AuthnGuard(new ValidateTokenService())).toBeDefined();
  });
});

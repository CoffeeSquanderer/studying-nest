import { ValidateTokenService } from 'src/auth/services/validate-token/validate-token.service';
import { AuthnGuard } from './authn.guard';

describe('AuthnGuard', () => {
  it('should be defined', () => {
    expect(new AuthnGuard(new ValidateTokenService())).toBeDefined();
  });
});

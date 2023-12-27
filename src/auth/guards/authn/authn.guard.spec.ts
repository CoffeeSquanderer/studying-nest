import { AuthService } from 'src/auth/services/auth/auth.service';
import { AuthnGuard } from './authn.guard';

describe('AuthnGuard', () => {
  it('should be defined', () => {
    expect(new AuthnGuard(new AuthService())).toBeDefined();
  });
});

import { Module, forwardRef } from '@nestjs/common';
import { LoginController } from './controllers/login/login.controller';
import { ValidateTokenService } from './services/validate-token/validate-token.service';
import { LoginService } from './services/login/login.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [LoginController],
  providers: [ValidateTokenService, LoginService],
  exports: [ValidateTokenService],
})
export class AuthModule {}

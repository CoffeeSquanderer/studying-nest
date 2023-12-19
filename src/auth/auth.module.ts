import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login/login.controller';
import { ValidateTokenService } from './services/validate-token/validate-token.service';
import { LoginService } from './services/login/login.service';

@Module({
  controllers: [LoginController],
  providers: [ValidateTokenService, LoginService],
  exports: [ValidateTokenService],
})
export class AuthModule {}

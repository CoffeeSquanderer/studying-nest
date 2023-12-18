import { Module } from '@nestjs/common';
import { LoginController } from './controllers/login/login.controller';
import { ValidateTokenService } from './validate-token/validate-token.service';

@Module({
  controllers: [LoginController],
  providers: [ValidateTokenService],
  exports: [ValidateTokenService],
})
export class AuthModule {}

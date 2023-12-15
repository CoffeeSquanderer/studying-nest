import { Module } from '@nestjs/common';
import { MeController } from './me/me.controller';
import { LoginController } from './login/login.controller';

@Module({
  controllers: [MeController, LoginController],
})
export class UserModule {}

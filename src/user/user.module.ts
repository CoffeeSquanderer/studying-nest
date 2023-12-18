import { Module } from '@nestjs/common';
import { MeController } from './controllers/me/me.controller';

@Module({
  controllers: [MeController],
})
export class UserModule {}

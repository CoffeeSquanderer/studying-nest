import { Module } from '@nestjs/common';
import { MeController } from './controllers/me/me.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [MeController],
})
export class UserModule {}

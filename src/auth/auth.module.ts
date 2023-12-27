import { Module, forwardRef } from '@nestjs/common';
import { LoginController } from './controllers/login/login.controller';
import { AuthService } from './services/auth/auth.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)],
  controllers: [LoginController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}

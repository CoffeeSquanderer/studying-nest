import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MeController } from './controllers/me/me.controller';
import { AuthModule } from 'src/auth/auth.module';
import { UserController } from './controllers/user/user.controller';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController, MeController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}

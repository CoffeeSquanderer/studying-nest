import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Log } from 'src/utils/log.decorator';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  @Log('UserRepository')
  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto as any);
  }

  @Log('UserRepository')
  findAll() {
    return this.userModel.findAll();
  }

  @Log('UserRepository')
  findById(id: number) {
    return this.userModel.findOne({ where: { id } });
  }

  @Log('UserRepository')
  findByLogin(login: string) {
    return this.userModel.findOne({ where: { login } });
  }

  @Log('UserRepository')
  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email } });
  }

  @Log('UserRepository')
  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.update(updateUserDto, { where: { id } });
  }

  @Log('UserRepository')
  remove(id: number) {
    return this.userModel.destroy({ where: { id } });
  }
}

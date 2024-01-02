import { Injectable, Logger } from '@nestjs/common';
import { Log } from 'src/utils/log.decorator';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  @Log('UserService')
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto as any);
  }

  @Log('UserService')
  async findAll() {
    return await this.userRepository.findAll();
  }

  @Log('UserService')
  async findById(id: number) {
    return await this.userRepository.findById(id);
  }

  @Log('UserService')
  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  @Log('UserService')
  async remove(id: number) {
    return await this.userRepository.remove(id);
  }

  @Log('UserService')
  async checkCredentials(loginOrEmail: string, password: string) {
    const isEmail = /^\S+@\S+\.\S+$/.test(loginOrEmail);
    const user =
      await this.userRepository[isEmail ? 'findByEmail' : 'findByLogin'](
        loginOrEmail,
      );
    if (!user) {
      this.logger.log(
        `Attempting to check credentials for loginOrEmail="${loginOrEmail}", user does not exist.`,
      );
      return false;
    }
    const { login } = user;

    this.logger.log(`Checking credentials for login="${login}".`);
    const areCredsValid = password === user.password;
    this.logger.log(
      `Password of login="${login}" ${
        areCredsValid ? 'has matched' : 'has not matched'
      }.`,
    );
    return areCredsValid;
  }
}

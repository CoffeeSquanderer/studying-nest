import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { VALID_LOGIN, VALID_PW } from '../../auth/constants/credentials';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
  ) {}

  create(createUserDto: CreateUserDto) {
    this.logger.log(`About to add a new user, login="${createUserDto.login}"`);
    return this.userRepository.create(createUserDto as any);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.logger.log(`About to update a user id="${id}"`);
    return this.userRepository.update(updateUserDto, { where: { id } });
  }

  remove(id: number) {
    this.logger.log(`About to remove a user, id="${id}"`);
    return this.userRepository.destroy({ where: { id } });
  }

  checkCredentials(login: string, password: string) {
    const isLoginValid = login === VALID_LOGIN;
    if (!isLoginValid) {
      this.logger.log(
        `Attempting to log in as login="${login}", user does not exist.`,
      );
      return false;
    }
    this.logger.log(`Attempting to log in for login="${login}".`);
    const areCredsValid = isLoginValid && password === VALID_PW;
    this.logger.log(
      `${
        areCredsValid ? 'Successful' : 'Unsuccessful'
      } login for login="${login}".`,
    );
    return areCredsValid;
  }
}

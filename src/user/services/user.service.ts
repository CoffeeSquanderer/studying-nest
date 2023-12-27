import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

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

  findById(id: number) {
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

  // TODO: check by email (?)
  async checkCredentials(login: string, password: string) {
    const user = await this.userRepository.findOne({ where: { login } });
    if (!user) {
      this.logger.log(
        `Attempting to check credentials for login="${login}", user does not exist.`,
      );
      return false;
    }

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

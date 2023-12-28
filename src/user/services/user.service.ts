import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    this.logger.log(`About to add a new user, login="${createUserDto.login}"`);
    return this.userRepository.create(createUserDto as any);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findById(id: number) {
    return this.userRepository.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.logger.log(`About to update a user id="${id}"`);
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    this.logger.log(`About to remove a user, id="${id}"`);
    return this.userRepository.remove(id);
  }

  // TODO: check by email (?)
  async checkCredentials(login: string, password: string) {
    const user = await this.userRepository.findByLogin(login);
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

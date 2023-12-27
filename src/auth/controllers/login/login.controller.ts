import {
  Controller,
  Post,
  Body,
  NotAcceptableException,
  UnauthorizedException,
  Res,
  Logger,
} from '@nestjs/common';
import { ApiUnauthorizedResponse, ApiOkResponse } from '@nestjs/swagger';
import type { Response } from 'express';
import { LoginDto } from '../../dtos/Login.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';
import { UserService } from 'src/user/services/user.service';

@Controller('login')
export class LoginController {
  private readonly logger = new Logger(LoginController.name);

  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post()
  @ApiUnauthorizedResponse({
    description: 'No login, no password, or any of them are invalid.',
  })
  @ApiOkResponse({
    description: 'Successful login, auth token returned.',
  })
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    const { login, password } = loginDto;
    if (!login) {
      this.logger.log('Attempting to log in, login is not provided.');
      throw new NotAcceptableException('No login');
    }
    if (!password) {
      this.logger.log('Attempting to log in, password is not provided.');
      throw new NotAcceptableException('No password');
    }
    const areCredsValid = await this.userService.checkCredentials(
      login,
      password,
    );
    if (!areCredsValid) {
      throw new UnauthorizedException('Login or password is invalid');
    }
    response
      .status(200)
      .send({ 'X-Auth-Token': this.authService.generateToken(login) });
  }
}

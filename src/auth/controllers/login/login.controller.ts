import {
  Controller,
  Post,
  Body,
  NotAcceptableException,
  UnauthorizedException,
  Res,
  Logger,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import type { Response } from 'express';
import { LoginDto } from './Login.dto';
import { LoginService } from 'src/auth/services/login/login.service';

@Controller('login')
export class LoginController {
  private readonly logger = new Logger(LoginController.name);

  constructor(private loginService: LoginService) {}

  @Post()
  @ApiBadRequestResponse({
    description: 'No login, no password, or any of them are invalid.',
  })
  @ApiCreatedResponse({
    description: 'Successful login, AUTH_TOKEN cookie is set.',
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
    if (!this.loginService.checkCredentials(login, password)) {
      throw new UnauthorizedException('Login or password is invalid');
    }
    response
      .status(200)
      .send({ 'X-Auth-Token': this.loginService.generateToken(login) });
  }
}

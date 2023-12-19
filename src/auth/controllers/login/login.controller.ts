import {
  Controller,
  Post,
  Body,
  NotAcceptableException,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import type { Response } from 'express';
import { LoginDto } from './Login.dto';
import { LoginService } from 'src/auth/services/login/login.service';

@Controller('login')
export class LoginController {
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
      throw new NotAcceptableException('No login');
    }
    if (!password) {
      throw new NotAcceptableException('No password');
    }
    if (this.loginService.checkCredentials(login, password)) {
      throw new UnauthorizedException('Login or password is invalid');
    }
    response
      .status(200)
      .send({ 'X-Auth-Token': this.loginService.generateToken() });
  }
}

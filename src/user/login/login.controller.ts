import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { LoginDto } from './Login.dto';
import { VALID_LOGIN, VALID_PW, VALID_TOKEN } from '../constants/auth';

@Controller('login')
export class LoginController {
  @Post()
  async login(@Body() loginDto: LoginDto, @Res() response: Response) {
    // TODO: move to services (?)
    const { login, password } = loginDto;
    if (!login) {
      throw new BadRequestException('No login');
    }
    if (!password) {
      throw new BadRequestException('No password');
    }
    if (login !== VALID_LOGIN || password !== VALID_PW) {
      throw new BadRequestException('Login or password is invalid');
    }
    response
      .cookie('AUTH_TOKEN', VALID_TOKEN)
      .status(200)
      .send('Logged in successfully');
  }
}

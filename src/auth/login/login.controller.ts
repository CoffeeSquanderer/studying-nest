import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse } from '@nestjs/swagger';
import type { Response } from 'express';
import { LoginDto } from './Login.dto';
import { VALID_LOGIN, VALID_PW, VALID_TOKEN } from '../constants/auth';

@Controller('login')
export class LoginController {
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
      throw new BadRequestException('No login');
    }
    if (!password) {
      throw new BadRequestException('No password');
    }
    if (login !== VALID_LOGIN || password !== VALID_PW) {
      throw new BadRequestException('Login or password is invalid');
    }
    response.status(200).cookie('AUTH_TOKEN', VALID_TOKEN).end();
  }
}

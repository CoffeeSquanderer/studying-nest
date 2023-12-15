import { Controller, Get, Ip } from '@nestjs/common';

@Controller('me')
export class MeController {
  @Get()
  getUserData(@Ip() ip: number): string {
    return `You are you, your IP is: ${ip}`;
  }
}

import { Controller, Get, Ip, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';

@Controller('me')
@UseGuards(AuthGuard)
export class MeController {
  @Get()
  getUserData(@Ip() ip: number): string {
    return `You are you, your IP is: ${ip}`;
  }
}

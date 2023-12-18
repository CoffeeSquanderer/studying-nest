import { Controller, Get, Ip, UseGuards } from '@nestjs/common';
import { AuthzGuard } from '../../../auth/guards/authz/authz.guard';
import { ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller('me')
@UseGuards(AuthzGuard)
export class MeController {
  @Get()
  @ApiOkResponse({
    description: 'User data.',
  })
  @ApiUnauthorizedResponse({
    description: 'No user - no data.',
  })
  getUserData(@Ip() ip: number): string {
    return `You are you, your IP is: ${ip}`;
  }
}

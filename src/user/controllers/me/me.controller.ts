import { Controller, Get, Ip, UseGuards } from '@nestjs/common';
import { AuthnGuard } from '../../../auth/guards/authn/authn.guard';
import {
  ApiBasicAuth,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@Controller('me')
@UseGuards(AuthnGuard)
export class MeController {
  @ApiBasicAuth('X-Auth-Token')
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

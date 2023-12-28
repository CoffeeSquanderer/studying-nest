import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty()
  readonly loginOrEmail: string;

  @ApiProperty()
  readonly password: string;
}

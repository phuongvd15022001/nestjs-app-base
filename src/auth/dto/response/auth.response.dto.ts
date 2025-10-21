import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { PayloadDto } from './payload.response.dto';

export class AuthResponseDto {
  @ApiProperty()
  @Expose()
  @Type(() => PayloadDto)
  payload: PayloadDto;

  @ApiProperty()
  @Expose()
  accessToken: string;

  @ApiProperty()
  @Expose()
  refreshToken: string;
}

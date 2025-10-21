import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ERole } from 'src/shared/constants/global.constants';

export class PayloadDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @Expose()
  sub: number;

  @ApiProperty({ example: 'jon@gmail.com', description: 'User Email' })
  @Expose()
  email: string;

  @ApiProperty({ example: 'Jon', description: 'User Name' })
  @Expose()
  name: string;

  @ApiProperty({ example: 'USER', description: 'User Role' })
  @Expose()
  role: ERole;
}

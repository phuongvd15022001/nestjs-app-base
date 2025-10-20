import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Jon', description: 'User Name' })
  @IsString()
  name: string;
}

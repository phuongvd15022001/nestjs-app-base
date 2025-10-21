import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import { ArrayField } from 'src/shared/decorators/dto.decorator';

export class CreateUsersDto {
  @ApiProperty({
    description: 'List of users to create',
    type: [CreateUserDto],
    example: [
      { email: 'user1@example.com', password: '123456', name: 'user1' },
      { email: 'user2@example.com', password: 'abcdef', name: 'user2' },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  @ArrayField(CreateUserDto)
  users: CreateUserDto[];
}

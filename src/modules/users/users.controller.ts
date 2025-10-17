import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.dto';

@Controller('users')
export class UsersController {
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return `Create user with name: ${createUserDto.name}`;
  }
}

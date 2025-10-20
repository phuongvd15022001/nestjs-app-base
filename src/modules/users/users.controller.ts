import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.dto';
import { CreateUsersDto } from './dto/request/create-users.dto';
import { UserResponseDto } from './dto/response/user.response.dto';

@Controller('users')
export class UsersController {
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return `Create user with name: ${createUserDto.name}`;
  }

  @Post('many')
  createUsers(@Body() createUsersDto: CreateUsersDto) {
    return `Create user with name: ${createUsersDto.users[0]?.name} and name: ${createUsersDto.users[1]?.name}`;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const todo = new UserResponseDto();
    todo.id = id;
    todo.name = 'Name';
    return todo;
  }
}

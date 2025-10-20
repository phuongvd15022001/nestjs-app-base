import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.dto';
import { CreateUsersDto } from './dto/request/create-users.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { TransformInterceptor } from 'src/shared/interceptors/transform.interceptor';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
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

  @UseInterceptors(new TransformInterceptor(UserResponseDto))
  @Get(':id')
  @ApiOkResponse({ type: UserResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    const todo = new UserResponseDto();
    todo.id = id;
    todo.name = 'Name';
    return todo;
  }
}

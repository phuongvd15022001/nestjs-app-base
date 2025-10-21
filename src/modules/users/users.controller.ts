import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/request/create-user.dto';
import { CreateUsersDto } from './dto/request/create-users.dto';
import { UserResponseDto } from './dto/response/user.response.dto';
import { TransformInterceptor } from 'src/shared/interceptors/transform.interceptor';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { GetListUsersDto } from './dto/request/get-list-users.dto';
import { BasePaginationResponseDto } from 'src/shared/dtos/base-pagination.response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

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

  @UseInterceptors(new TransformInterceptor(UserResponseDto))
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    type: BasePaginationResponseDto.apiOKResponse(UserResponseDto),
  })
  findAll(@Query() getListUsersDto: GetListUsersDto) {
    return this.userService.findAll({ getListUsersDto });
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
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
import { UpdateUserDto } from './dto/request/update-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // GET /users
  @UseInterceptors(new TransformInterceptor(UserResponseDto))
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiOkResponse({
    type: BasePaginationResponseDto.apiOKResponse(UserResponseDto),
  })
  findAll(@Query() getListUsersDto: GetListUsersDto) {
    return this.userService.findAll({ getListUsersDto });
  }

  // GET /users/:id
  @UseInterceptors(new TransformInterceptor(UserResponseDto))
  @Get(':id')
  @ApiOperation({ summary: 'Get detail user' })
  @ApiOkResponse({ type: UserResponseDto })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // POST /users
  @UseInterceptors(new TransformInterceptor(UserResponseDto))
  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiOkResponse({ type: UserResponseDto })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  // PUT /users/:id
  @UseInterceptors(new TransformInterceptor(UserResponseDto))
  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiOkResponse({ type: UserResponseDto })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  // DELETE /users/:id
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @HttpCode(204)
  removeUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }

  // POST /users/many
  @Post('many')
  @ApiOperation({ summary: 'Create new user' })
  @ApiOkResponse({ type: Number })
  createManyUsers(@Body() createUsersDto: CreateUsersDto) {
    return this.userService.createMany(createUsersDto);
  }
}

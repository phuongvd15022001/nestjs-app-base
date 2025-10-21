import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { BasePaginationResponseDto } from 'src/shared/dtos/base-pagination.response.dto';
import { GetListUsersDto } from './dto/request/get-list-users.dto';
import { CommonHelpers } from 'src/shared/helpers/common.helpers';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findAll(params: { getListUsersDto: GetListUsersDto }) {
    const { getListUsersDto } = params;
    const { take, skip, sortByField } = CommonHelpers.transformPaginationQuery(
      getListUsersDto,
      Prisma.UserScalarFieldEnum,
    );

    const where: Prisma.UserWhereInput = {
      name: {
        contains: getListUsersDto.search,
        mode: Prisma.QueryMode.insensitive,
      },
    };

    const users = await this.usersRepository.findAll({
      take,
      skip,
      orderBy: sortByField,
      where,
    });

    if (users.length == 0) {
      throw new NotFoundException('No user exists');
    }

    const total = await this.usersRepository.count({ where });

    return BasePaginationResponseDto.convertToPaginationResponse(
      [users, users.length],
      getListUsersDto.page,
      total,
    );
  }
}

import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { BasePaginationResponseDto } from 'src/shared/dtos/base-pagination.response.dto';
import { GetListUsersDto } from './dto/request/get-list-users.dto';
import { CommonHelpers } from 'src/shared/helpers/common.helpers';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/request/create-user.dto';
import { UpdateUserDto } from './dto/request/update-user.dto';
import { CreateUsersDto } from './dto/request/create-users.dto';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private prisma: PrismaService,
    private productsService: ProductsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async findAll(params: { getListUsersDto: GetListUsersDto }) {
    const { getListUsersDto } = params;

    const cacheKey = `users:${JSON.stringify(getListUsersDto)}`;

    const cached = await this.cacheManager.get(cacheKey);

    if (cached) {
      return cached;
    }

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

    const result = BasePaginationResponseDto.convertToPaginationResponse(
      [users, users.length],
      getListUsersDto.page,
      total,
    );

    await this.cacheManager.set(cacheKey, result);

    return result;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      whereUniqueInput: {
        id,
      },
      includes: {
        Product: true,
      },
    });

    if (user == null) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const checkExistEmail = await this.usersRepository.findOne({
      whereUniqueInput: {
        email: createUserDto.email,
      },
    });

    if (checkExistEmail) {
      throw new ConflictException('Email already exists');
    }

    const user = await this.usersRepository.create({ data: createUserDto });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      const checkExistEmail = await this.usersRepository.findOne({
        whereUniqueInput: {
          email: updateUserDto.email,
        },
      });

      if (checkExistEmail && checkExistEmail.id != id) {
        throw new ConflictException('Email already exists');
      }
    }

    const checkExistUser = await this.usersRepository.findOne({
      whereUniqueInput: { id },
    });

    if (!checkExistUser) {
      throw new NotFoundException('User not found');
    }

    const user = await this.usersRepository.update({
      whereUniqueInput: {
        id,
      },
      data: updateUserDto,
    });

    return user;
  }

  async remove(id: number) {
    try {
      await this.usersRepository.delete({
        whereUniqueInput: {
          id,
        },
      });
    } catch (error) {
      console.error(error);
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async createMany(createUsersDto: CreateUsersDto) {
    const listEmails = createUsersDto.users.map((item) => item.email);
    const checkExistEmail = await this.usersRepository.findAll({
      where: {
        email: {
          in: listEmails,
        },
      },
    });

    if (checkExistEmail) {
      throw new ConflictException('Email already exists');
    }

    const result = await this.prisma.$transaction(async (transaction) => {
      return await this.usersRepository.createManyWithTransaction({
        data: createUsersDto.users,
        transaction,
      });
    });

    return result.count;
  }

  async findOneByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      whereUniqueInput: {
        email,
      },
    });

    if (user == null) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async refreshToken(id: number, refreshToken: string) {
    const checkExistUser = await this.usersRepository.findOne({
      whereUniqueInput: { id },
    });

    if (!checkExistUser) {
      throw new NotFoundException('User not found');
    }

    const user = await this.usersRepository.update({
      whereUniqueInput: {
        id,
      },
      data: {
        refreshToken,
      },
    });

    return user;
  }
}

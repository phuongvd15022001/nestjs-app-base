import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findAll() {
    const users = await this.usersRepository.findAll({});

    return users;
  }
}

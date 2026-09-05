import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum.js';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findById(id: string) {
    return this.usersRepository.findOne({ where: { id } });
  }

  findAll() {
    return this.usersRepository.find({ order: { createdAt: 'DESC' } });
  }

  async updateRole(id: string, role: Role) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = role;
    return this.usersRepository.save(user);
  }
}

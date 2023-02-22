import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'node:crypto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getAllUsers() {
    const users = await this.userRepository.find();
    return users;
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    const hashPassword = this.hashPassword(password);
    if (!hashPassword) {
      throw new Error();
    }
    const newUser = this.userRepository.create({
      login,
      password: hashPassword,
    });
    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  async getUser(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }
    return user;
  }

  async deleteUser(id: string) {
    const { affected } = await this.userRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }
  }

  async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Record with id === ${id} doesn't exist`);
    }

    const isEquals = this.hashPassword(oldPassword) === user.password;
    if (!isEquals) {
      throw new NotFoundException(`An old password is wrong`);
    }

    const hashNewPassword = this.hashPassword(newPassword);
    await this.userRepository.update(id, { password: hashNewPassword });
    const updatedUser = await this.userRepository.findOneBy({ id });
    return updatedUser;
  }

  private hashPassword = (password: string): string =>
    createHash('sha256').update(password).digest('hex');
}

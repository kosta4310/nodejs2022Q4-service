import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDbService } from 'src/db/userDb.service';
import { toCompare } from 'src/utils/toCompare';
import { toHash } from 'src/utils/toHash';
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
    return await this.userRepository.find();
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    const hashPassword = await toHash(password);
    if (!hashPassword) {
      throw new Error('Error bcrypt');
    }
    password = hashPassword;
    const newUser = this.userRepository.create({ login, password });
    return await this.userRepository.save(newUser);
  }

  async getUser(id: string) {
    const res = await this.userRepository.findOneBy({ id });
    if (res) {
      return res;
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async deleteUser(id: string) {
    const res = await this.userRepository.delete(id);
    if (!res.affected) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }
    return res;
  }

  async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }

    const isEquals = await toCompare(oldPassword, user.password);
    if (!isEquals) {
      throw new HttpException(`oldPassword is wrong`, 403);
    }

    const hashNewPassword = await toHash(newPassword);
    await this.userRepository.update(id, { password: hashNewPassword });
    return await this.userRepository.findOneBy({ id });
  }
}

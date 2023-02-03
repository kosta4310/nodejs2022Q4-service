import { HttpException, Inject, Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');
import { DbModule } from 'src/db/db.module';
import { UserDbService } from 'src/db/userDb.service';
import { toCompare } from 'src/utils/toCompare';
import { toHash } from 'src/utils/toHash';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private userDb: UserDbService) {}

  async getAllUsers() {
    return await this.userDb.getAll();
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    const hashPassword = await toHash(password);
    if (!hashPassword) {
      throw new Error('Error bcrypt');
    }
    password = hashPassword;
    return await this.userDb.createUser({ login, password });
  }

  async getUser(id: string) {
    const res = await this.userDb.getUser(id);
    if (res) {
      return res;
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async deleteUser(id: string) {
    const res = await this.userDb.deleteUser(id);
    if (res) {
      return res;
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
  }

  async updateUserPassword(
    id: string,
    { oldPassword, newPassword }: UpdatePasswordDto,
  ) {
    const user = await this.userDb.getUser(id);
    if (!user) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404);
    }

    const isEquals = await toCompare(oldPassword, user.password);
    if (!isEquals) {
      throw new HttpException(`oldPassword ${oldPassword} is wrong`, 403);
    }

    const hashNewPassword = await toHash(newPassword);
    return await this.userDb.updateUser(id, hashNewPassword);
  }
}

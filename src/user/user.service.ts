import { HttpException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { DbModule } from 'src/db/db.module';
import { UserDbService } from 'src/db/userDb.service';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private userDb: UserDbService) { }
  
  async getAllUsers() {
    return await this.userDb.getAll();
  }

  async createUser({ login, password }: CreateUserDto): Promise<User> {
    const hashPassword: string = await new Promise((res, rej) => {
      bcrypt.hash(password, 10, function(err, hash) {
        if (err) {
          rej('Error bcrypt');
        }
          res(hash);
        });
    })
    
    password = hashPassword;
    const version = 1;
    const createdAt = Date.now();
    const updatedAt = Date.now();

    return await this.userDb.createUser({ version, createdAt, updatedAt, login, password });
  }

  async  getUser(id: string) {
    const res = await this.userDb.getUser(id);
    if (res) {
      return res;
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404)
  }

  async deleteUser(id: string) {
    const res = await this.userDb.deleteUser(id);
    if (res) {
      return res;
    }
    throw new HttpException(`Record with id === ${id} doesn't exist`, 404)
  }

  async updateUserPassword(id: string, {oldPassword, newPassword}: UpdatePasswordDto) {

    const user = await this.userDb.getUser(id);
    if (!user) {
      throw new HttpException(`Record with id === ${id} doesn't exist`, 404)
    }

    const passwordFromHash = await new Promise((res, rej) => {
      bcrypt.compare(oldPassword, user.password, function(err, result) {
        if (err) {
          rej('Error bcrypt');
        }
        res(result)
      });
    })

    if (passwordFromHash !== oldPassword) {
      throw new HttpException(`oldPassword ${oldPassword} is wrong`, 403)
    }

    const hashPassword: string = await new Promise((res, rej) => {
      bcrypt.hash(newPassword, 10, function(err, hash) {
        if (err) {
          rej('Error bcrypt');
        }
          res(hash);
        });
    })

    user.password = hashPassword;
    
  }
}

import { Injectable } from '@nestjs/common';
const crypto = require('node:crypto');
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class UserDbService {
  private db: User[] = [];

  async getAll() {
    return this.db;
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const id = crypto.randomUUID({ disableEntropyCache: true });
    const newUser = Object.assign(user, {id})
    this.db.push(newUser);
    return newUser;
  }
}

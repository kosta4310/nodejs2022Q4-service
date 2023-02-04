import { Injectable } from '@nestjs/common';
import {randomUUID} from 'node:crypto';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class UserDbService {
  private db: User[] = [];

  async getAll() {
    return this.db;
  }

  async createUser(user: Pick<User, 'login' | 'password'>): Promise<User> {
    const id = randomUUID({ disableEntropyCache: true });
    const createdAt = Date.now();
    const updatedAt = createdAt;
    const version = 1;
    const newUser = Object.assign(user, { id, createdAt, updatedAt, version });
    this.db.push(newUser);
    return newUser;
  }

  async getUser(id: string) {
    return this.db.find((user) => user.id === id);
  }

  async deleteUser(id: string) {
    const beforeLength = this.db.length;
    const filteredDb = this.db.filter((user) => user.id !== id);
    if (beforeLength !== filteredDb.length) {
      this.db = filteredDb;
      return id;
    }
    return;
  }

  async updateUser(id: string, password: string) {
    const user = this.db.find((user) => user.id === id);
    user.version += 1;
    user.updatedAt = Date.now();
    user.password = password;
    return user;
  }
}

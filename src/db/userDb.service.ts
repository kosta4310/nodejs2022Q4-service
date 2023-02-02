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

  async getUser(id: string) {
    return this.db.find(user => user.id === id);
  }

  async deleteUser(id: string) {
    const beforeLength = this.db.length;
    const filteredDb = this.db.filter(user => user.id !== id);
    if (beforeLength !== filteredDb.length) {
      this.db = filteredDb;
      return id;
    }
    return;
  }

  async updateField(id: string, {field, value}: {field: string, value: string}) {
    const user = this.db.find(user => user.id === id);
    user[field] = value;
    return user;
  }
}

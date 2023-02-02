import { Injectable } from '@nestjs/common';
import { User } from 'src/user/interfaces/user.interface';

@Injectable()
export class UserDbService {
  private db: User[] = []
  async getAll() {
    return this.db;
  }
  // create(user: string) {
  //   this.db.push(user);
  //   return user;
  // }
}

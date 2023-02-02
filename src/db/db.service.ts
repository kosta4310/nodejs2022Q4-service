import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  private db: any[] = ['user1', 'user2']
  getAll() {
    return this.db;
  }
}

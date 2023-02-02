import { Inject, Injectable } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import {  UserDbService } from 'src/db/userDb.service';


@Injectable()
export class UserService {
  constructor(private userDb: UserDbService){}
  async getAllUsers() {
    return await this.userDb.getAll();
  }
  // createUser(user: string) {
  //   return this.userDb.create(user);
  // }
}

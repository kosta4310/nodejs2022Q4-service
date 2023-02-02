import { Inject, Injectable } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { UserDbService } from 'src/db/userDb.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(private userDb: UserDbService) { }
  
  async getAllUsers() {
    return await this.userDb.getAll();
  }

  async createUser({login, password}: CreateUserDto): Promise<User> {
    
    const version = 1;
    const createdAt = Date.now();
    const updatedAt = Date.now();

    return await this.userDb.createUser({ version, createdAt, updatedAt, login, password });
  }
}

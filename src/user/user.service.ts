import { Inject, Injectable } from '@nestjs/common';
import { DbModule } from 'src/db/db.module';
import { DbService } from 'src/db/db.service';


@Injectable()
export class UserService {
  constructor(private db: DbService){}
  getAllUsers() {
   
    return this.db.getAll();
  }
}

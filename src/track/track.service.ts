import { Injectable } from '@nestjs/common';
import { TrackDbService } from 'src/db/trackDb.service';
import { UserDbService } from 'src/db/userDb.service';

@Injectable()
export class TrackService {
  constructor(private db: UserDbService, private trackDB: TrackDbService) {}
  getAllUsers() {
    return this.trackDB.getAll();
  }
  createUser(user: string) {
    return this.trackDB.create(user);
  }
}

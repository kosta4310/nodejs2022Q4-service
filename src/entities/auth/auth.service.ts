import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/createUserDto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(userDto: CreateUserDto) {
    const payload = { username: userDto.login, sub: userDto.password };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(userDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(userDto);
    return user;
  }
}

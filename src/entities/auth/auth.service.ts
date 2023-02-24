import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../user/dto/createUserDto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Token } from './types/tokenType';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async login(userDto: CreateUserDto) {
    const { id, login } = await this.userService.checkPassword(userDto);

    // const payload = { username: userDto.login, sub: userDto.password };
    const tokens = await this.getTokens(id, login);
    return tokens;
  }

  async signup(userDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(userDto);
    return user;
  }

  private async getTokens(userId: string, login: string): Promise<Token> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_KEY,
          expiresIn: process.env.TOKEN_EXPIRE_TIME,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          login,
        },
        {
          secret: process.env.JWT_SECRET_REFRESH_KEY,
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}

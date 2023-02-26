import { Injectable } from '@nestjs/common';
import {
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { JsonWebTokenError } from 'jsonwebtoken';
import { CreateUserDto } from '../user/dto/createUserDto';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
// import { JwtStrategy } from './strategies/jwt.strategy';
import { Token } from './types/tokenType';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    // private jwtStrategy: JwtStrategy,
    private userService: UserService,
  ) {}

  async login(userDto: CreateUserDto) {
    const { id, login } = await this.userService.checkPassword(userDto);
    const tokens = await this.getTokens(id, login);
    return tokens;
  }

  async signup(userDto: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(userDto);
    return user;
  }

  async refresh(refreshToken: string) {
    try {
      const { sub, login } = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        ignoreExpiration: false,
      });

      const tokens = await this.getTokens(sub, login);
      return tokens;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        throw new ForbiddenException(`Not allowed access`);
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
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

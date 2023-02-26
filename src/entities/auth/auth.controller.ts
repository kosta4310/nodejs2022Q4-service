import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUserDto';
import { UserEntity } from '../user/utils/userEntity';
import { AuthService } from './auth.service';
import { Public } from './decorators/decorator.public';
import { Token } from './types/tokenType';

@Public()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() userDTO: CreateUserDto): Promise<Token> {
    const tokens = this.authService.login(userDTO);
    return tokens;
  }

  @Post('signup')
  async signup(@Body() userDTO: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.authService.signup(userDTO);
    return new UserEntity(createdUser);
  }

  @Post('refresh')
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {
    const tokens = this.authService.refresh(refreshToken);
    return tokens;
  }
}

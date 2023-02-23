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
import { Token } from './types/tokenType';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //   @Post('login')
  //   async login(@Body() user): Promise<Token> {
  //     return this.authService.login(user);
  //   }

  @Post('signup')
  async signup(@Body() userDTO: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.authService.signup(userDTO);
    return new UserEntity(createdUser);
  }
}

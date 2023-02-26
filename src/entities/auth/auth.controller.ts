import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUserDto';
import { UserEntity } from '../user/utils/userEntity';
import { AuthService } from './auth.service';
import { Public } from './decorators/decorator.public';
import { ValidationRefreshPipe } from './pipes/validationRefreshPipe';
import { Tokens } from './types/tokenType';

@Public()
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  async login(@Body() userDTO: CreateUserDto): Promise<Tokens> {
    const tokens = this.authService.login(userDTO);
    return tokens;
  }

  @Post('signup')
  async signup(@Body() userDTO: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.authService.signup(userDTO);
    return new UserEntity(createdUser);
  }

  @HttpCode(200)
  @Post('refresh')
  async refresh(
    @Body('refreshToken', new ValidationRefreshPipe())
    refreshToken: string,
  ): Promise<Tokens> {
    const tokens = this.authService.refresh(refreshToken);
    return tokens;
  }
}

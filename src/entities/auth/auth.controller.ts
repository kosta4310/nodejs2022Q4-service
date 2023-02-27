import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dto/createUserDto';
import { UserEntity } from '../user/utils/userEntity';
import { AuthService } from './auth.service';
import { Public } from './decorators/decorator.public';
import { RefreshGuard } from './guard/refresh-auth.guard';
import { ValidationRefreshPipe } from './pipes/validationRefreshPipe';
import { Tokens } from './types/tokenType';

@UseGuards(RefreshGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('login')
  async login(@Body() userDTO: CreateUserDto): Promise<Tokens> {
    const tokens = this.authService.login(userDTO);
    return tokens;
  }

  @Public()
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

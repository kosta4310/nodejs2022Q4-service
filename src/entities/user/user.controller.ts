import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { UserService } from './user.service';
import { UserEntity } from './utils/userEntity';

@UseGuards(JwtAccessAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAll() {
    const users = await this.userService.getAllUsers();
    const usersOhnePassword = users.map((user) => new UserEntity(user));
    return usersOhnePassword;
  }

  @Post()
  async createUser(@Body() userDTO: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.userService.createUser(userDTO);
    return new UserEntity(createdUser);
  }

  @Get(':id')
  async getUser(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<UserEntity> {
    const user = await this.userService.getUser(id);
    return new UserEntity(user);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.deleteUser(id);
  }

  @Put(':id')
  async updateUserPassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() passwordDTO: UpdatePasswordDto,
  ): Promise<UserEntity> {
    const user = await this.userService.updateUserPassword(id, passwordDTO);
    return new UserEntity(user);
  }
}

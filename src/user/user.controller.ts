import {
  Controller,
  Get,
  Res,
  Req,
  Post,
  Param,
  ParseIntPipe,
  Body,
  HttpCode,
  UsePipes,
  ValidationPipe,
  HttpStatus,
  HttpException,
  ParseUUIDPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
  Put,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDto } from './dto/createUserDto';
import { UpdatePasswordDto } from './dto/updatePasswordDto';
import { UserService } from './user.service';
import { UserEntity } from './utils/userEntity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }
  
  @Get()
  async getAll() {
    return await this.userService.getAllUsers();
  }

  
  @Post()
  async createUser(
    @Req() req: Request,
    // @Res({ passthrough: true }) res: Response,
    @Body() userDTO: CreateUserDto,
  ): Promise<UserEntity> {
    const createdUser =  await this.userService.createUser(userDTO);
    return new UserEntity(createdUser);
  }

  @Get(':id')
  async getUser(
    @Req() req: Request,
    @Param('id', new ParseUUIDPipe()) id: string):  Promise<UserEntity> {
      
    const user = await this.userService.getUser(id);
    return new UserEntity(user); 
  }
  
  @HttpCode(204)
  @Delete(':id')
  async deleteUser(
    @Req() req: Request,
    @Param('id', new ParseUUIDPipe()) id: string
  ) {
     await this.userService.deleteUser(id);
    
  }

  @Put(':id')
  async updateUserPassword(
    @Req() req: Request,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() passwordDTO: UpdatePasswordDto,
  ) {
    return await this.userService.updateUserPassword(id, passwordDTO);
     
  }

}

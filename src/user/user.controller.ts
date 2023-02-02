import { Controller, Get, Res, Req, Post, Param, ParseIntPipe, Body } from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}
  @Get()
  async getAll() {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      
    }
        
  }

  @Post()
  async createUser(@Req() req: Request, @Res() res: Response, @Body() userDTO: CreateUserDto) {
   
    return 'hello';
  }

@Get(':id')
  async getUser(@Req() req: Request, @Res() res: Response, @Param() pa: any, @Param('id', ParseIntPipe) id: number) {

    console.log();
    
    return res.send({data: id, par: pa});
  }

  
}

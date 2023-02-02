import { Controller, Get, Res, Req, Post, Param, ParseIntPipe, Body, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { Response, Request } from 'express';
import { CreateUserDto } from './dto/createUser.dto';
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
  // @HttpCode(201)
  // @UsePipes(new ValidationPipe({transform: true}))
  async createUser(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() userDTO: CreateUserDto) {
      return req.body;
  }

// @Get(':id')
//   async getUser(@Req() req: Request, @Res() res: Response, @Param() pa: any, @Param('id', ParseIntPipe) id: number) {

//     console.log();
    
//     return res.send({data: id, par: pa});
//   }

  
}

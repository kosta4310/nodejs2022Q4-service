import { Controller, Get, Res, Req, Post, Param, ParseIntPipe } from '@nestjs/common';
import { Response, Request } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService){}
  @Get()
  async getAll(@Req() req: Request, @Res() res: Response) {

    res.statusCode = 300;
    const r = this.userService.getAllUsers();
    console.log(r);
    
    return res.send(r);
  }

@Get(':id')
  async getUser(@Req() req: Request, @Res() res: Response, @Param() pa: any, @Param('id', ParseIntPipe) id: number) {

    console.log();
    
    return res.send({data: id, par: pa});
  }

  @Post()
  async createUser(@Req() req: Request, @Res() res: Response) {
    // const r = this.userService.getAllUsers();
    console.log(req.headers);
    return res.send(`created `);
  }
}

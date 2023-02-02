import { Controller, Get, Res, Req, Post, Param, ParseIntPipe } from '@nestjs/common';
import { Response, Request } from 'express';
import { TrackService } from './track.service';


@Controller('track')
export class TrackController { 
  constructor(private trackService: TrackService){}
  @Get()
  async getAll(@Req() req: Request, @Res() res: Response) {

    res.statusCode = 300;
    const r = this.trackService.getAllUsers();
    console.log(r);
    
    return res.send(r);
  }

@Get(':id')
  async getUser(@Req() req: Request, @Res() res: Response, @Param() pa: any, @Param('id', ParseIntPipe) id: number) {

    console.log();
    
    return res.send({data: id, par: pa});
  }

  @Post()
  async createUser() {
    // const r = this.userService.getAllUsers();
    // console.log(req.headers);
    return this.trackService.createUser('user3');
  }
}



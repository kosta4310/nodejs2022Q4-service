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
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbumDto';

@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) { }
  
  @Get()
  async getAll() {
    return await this.albumService.getAll();
  }

  // @Get(':id')
  // async getAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return await this.albumService.getAlbum(id);
  // }

  @Post()
  async createAlbum(@Body() trackDTO: CreateAlbumDto) {
    return this.albumService.createAlbum(trackDTO);
  }

  // @Put(':id')
  // async updateAlbum(
  //   @Body() trackDTO: CreateAlbumDto,
  //   @Param('id', new ParseUUIDPipe()) id: string,
  // ) {
  //   return await this.albumService.updateTrack(id, trackDTO);
  // }

  // @HttpCode(204)
  // @Delete(':id')
  // async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return await this.albumService.deleteTrack(id);
  // }
}

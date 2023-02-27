import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAccessAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/createAlbumDto';
import { UpdateAlbumDto } from './dto/updateAlbumDto';

@UseGuards(JwtAccessAuthGuard)
@Controller('album')
export class AlbumController {
  constructor(private albumService: AlbumService) {}

  @Get()
  async getAll() {
    return await this.albumService.getAll();
  }

  @Get(':id')
  async getAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.albumService.getAlbum(id);
  }

  @Post()
  async createAlbum(@Body() trackDTO: CreateAlbumDto) {
    return this.albumService.createAlbum(trackDTO);
  }

  @Put(':id')
  async updateAlbum(
    @Body() albumDTO: UpdateAlbumDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.albumService.updateAlbum(id, albumDTO);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.albumService.deleteAlbum(id);
  }
}

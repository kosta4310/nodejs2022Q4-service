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
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/createArtistDto';
import { UpdateArtistDto } from './dto/updateArtistDto';

@Controller('artist')
export class ArtistController {
  constructor(private artistService: ArtistService) {}

  @Get()
  async getAll() {
    return await this.artistService.getAllArtists();
  }

  @Post()
  async createArtist(@Body() artistDTO: CreateArtistDto) {
    return await this.artistService.createArtist(artistDTO);
  }

  @Get(':id')
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.artistService.getArtist(id);
  }

  @Put(':id')
  async updateArtist(
    @Body() artistDTO: UpdateArtistDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.artistService.updateArtist(id, artistDTO);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.artistService.deleteArtist(id);
  }
}

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
import { CreateTrackDto } from './dto/createTrackDto';
import { TrackService } from './track.service';

@UseGuards(JwtAccessAuthGuard)
@Controller('track')
export class TrackController {
  constructor(private trackService: TrackService) {}

  @Get()
  async getAll() {
    return await this.trackService.getAll();
  }

  @Get(':id')
  async getTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.trackService.getTrack(id);
  }

  @Post()
  async createTrack(@Body() trackDTO: CreateTrackDto) {
    return this.trackService.createTrack(trackDTO);
  }

  @Put(':id')
  async updateTrack(
    @Body() trackDTO: CreateTrackDto,
    @Param('id', new ParseUUIDPipe()) id: string,
  ) {
    return await this.trackService.updateTrack(id, trackDTO);
  }

  @HttpCode(204)
  @Delete(':id')
  async deleteTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.trackService.deleteTrack(id);
  }
}

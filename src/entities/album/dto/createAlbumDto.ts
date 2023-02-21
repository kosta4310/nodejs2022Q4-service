import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist

  @IsInt()
  year: number; // integer number
}

import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAlbumDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsInt()
  year: number; // integer number
}

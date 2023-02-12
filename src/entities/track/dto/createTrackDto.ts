import { IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsUUID()
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}

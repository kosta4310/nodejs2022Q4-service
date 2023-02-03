import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @IsOptional()
  // @IsNotEmpty()
  @IsString()
  artistId: string | null; // refers to Artist

  @IsOptional()
  @IsString()
  // @IsNotEmpty()
  albumId: string | null; // refers to Album

  @IsInt()
  duration: number; // integer number
}

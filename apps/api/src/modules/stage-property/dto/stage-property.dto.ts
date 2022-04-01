import { IsNumber, IsOptional, IsString, IsMongoId } from 'class-validator';

export class StagePropertyDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  images: Array<Express.Multer.File | string>;
}

export class EditStagePropertyDto {
  @IsMongoId()
  id: string;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  price: number;

  @IsOptional()
  images: string[];
}

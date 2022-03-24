import { IsNumber, IsOptional, IsString, IsArray, IsMongoId } from 'class-validator'

export class StagePropertyDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsOptional()
  @IsNumber()
  price: number

  @IsArray()
  images: string[]
}

export class EditStagePropertyDto {
  @IsMongoId()
  id: string

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsNumber()
  price: number

  @IsOptional()
  @IsArray()
  images: string[]
}

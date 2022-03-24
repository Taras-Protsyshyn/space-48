import { IsNumber, IsOptional, IsString } from 'class-validator'

export class StagePropertyDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsOptional()
  @IsNumber()
  price: number

}

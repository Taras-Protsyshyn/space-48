import { IsString, IsEmail } from 'class-validator'

export class AuthLoginDto {
  @IsEmail()
  login: string;

  @IsString()
  password: string;
}

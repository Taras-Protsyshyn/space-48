import { IsString, IsEmail } from 'class-validator'

export class AuthRegisterDto {
  @IsEmail()
  login: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  passwordHash: string;
}

export class AuthLoginDto {
  @IsEmail()
  login: string;

  @IsString()
  password: string;
}

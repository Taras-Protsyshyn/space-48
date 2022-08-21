
import { IsString, IsEnum, IsOptional, IsNotEmpty } from 'class-validator'

import { UserRoles } from '@space-48/shared/constants';

export class UserBaseDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  role: UserRoles;

}

export class UserDto extends UserBaseDto {
  @IsEnum(UserRoles)
  role: UserRoles;

  @IsString()
  @IsNotEmpty()
  passwordHash: string;
}

export class RegisterUserDto extends UserBaseDto {
  @IsString()
  @IsNotEmpty()
  password: string
}



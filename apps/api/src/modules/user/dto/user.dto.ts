
import { IsString, IsEnum, IsOptional } from 'class-validator'

import { UserRoles } from '@space-48/shared/constants';

export class UserBaseDto {
  @IsString()
  login: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsOptional()
  role: UserRoles;

}

export class UserDto extends UserBaseDto {
  @IsEnum(UserRoles)
  role: UserRoles;

  @IsString()
  passwordHash: string;
}

export class RegisterUserDto extends UserBaseDto {
  @IsString()
  password: string
}



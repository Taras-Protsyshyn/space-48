
import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from './../user/user.service';
import { AuthLoginDto } from './dto/auth.dto'
import { UserDto } from '../user/dto/user.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthLoginDto): Promise<{ user: Omit<UserDto, "passwordHash">, jwt: string }> {
    const user = await this.authService.validateUser(dto);
    const jwt = await this.authService.createJWT(user.login, user.role);

    return {
      user: {
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
      jwt
    }
  }
}

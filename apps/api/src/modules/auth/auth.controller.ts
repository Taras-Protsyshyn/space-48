import { UserModel } from './../user/user.model';
import { UserService } from './../user/user.service';

import { BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterDto, AuthLoginDto } from './dto/auth.dto';
import { USER_ALREADY_EXIST } from './auth.constants'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: AuthRegisterDto) {
    const oldUser = await this.userService.findUser(dto.login);

    if (oldUser) {
      throw new BadRequestException(USER_ALREADY_EXIST);
    }
    const userWithHashedPsw = await this.authService.hashPassword(dto);

    return this.userService.createUser(userWithHashedPsw);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('login')
  async login(@Body() dto: AuthLoginDto): Promise<{ user: Omit<AuthRegisterDto, "passwordHash">, jwt: string }> {
    const user = await this.authService.validateUser(dto);
    const jwt = await this.authService.createJWT(dto.login);

    return {
      user: {
        login: user.login,
        firstName: user.firstName,
        lastName: user.lastName
      },
      jwt
    }
  }
}

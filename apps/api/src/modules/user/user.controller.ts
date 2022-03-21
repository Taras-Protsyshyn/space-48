import { UserLogin } from './../../decorators/user-login.decorator';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { UserService } from './user.service';
import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';

import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async getAllUsers(@UserLogin() login: string) {

    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {

    return `${id}`
  }

  @Patch('/archive')
  async register(@Body() dto: UserDto) {
    return dto
  }
}

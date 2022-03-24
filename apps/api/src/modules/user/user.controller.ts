import { BadRequestException, Body, Controller, Get, Param, Patch, UseGuards, UsePipes, ValidationPipe, Post } from '@nestjs/common';
import { UserRoles } from '@space-48/shared/constants';

import { AuthService } from './../auth/auth.service';
import { UserService } from './user.service';
import { JwtAuthGuard } from './../auth/guards/jwt.guard';
import { UserDto, RegisterUserDto } from './dto/user.dto';
import { USER_ALREADY_EXIST } from './user.constants'
import { Roles } from '../../decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @UsePipes(new ValidationPipe())
  @Post('register')
  async register(@Body() dto: RegisterUserDto) {
    const oldUser = await this.userService.findUser(dto.login);

    if (oldUser) {
      throw new BadRequestException(USER_ALREADY_EXIST);
    }

    const passwordHash = await this.authService.hashPassword(dto.password);


    return this.userService.createUser({ ...dto, role: UserRoles.user, passwordHash });
  }

  @Roles(UserRoles.admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('')
  async getAllUsers() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {

    return `${id}`
  }

  @Patch('/archive')
  async archive(@Body() dto: UserDto) {
    return dto
  }
}

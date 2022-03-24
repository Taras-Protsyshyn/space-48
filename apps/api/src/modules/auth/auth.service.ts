import { UserRoles } from '@space-48/shared/constants';
import { UserService } from './../user/user.service';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from './auth.constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { genSalt, hash, compare } from 'bcrypt'

import { AuthLoginDto } from './dto/auth.dto';
import { UserModel } from './../user/user.model';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) { }

  async hashPassword(passwordHash: string): Promise<string> {
    const salt = await genSalt(10);

    return await hash(passwordHash, salt)
  }

  async validateUser(dto: AuthLoginDto): Promise<DocumentType<UserModel>> {
    const user = await this.userService.findUser(dto.login);

    if (user === null) {
      throw new UnauthorizedException(USER_NOT_FOUND_ERROR)
    }

    const isCorrectPassword = await compare(dto.password, user.passwordHash)

    if (!isCorrectPassword) {
      throw new UnauthorizedException(WRONG_PASSWORD_ERROR)
    }

    return user;
  }

  async createJWT(login: string, role: UserRoles): Promise<string> {
    const payload = { login, role };

    return await this.jwtService.signAsync(payload)
  }
}

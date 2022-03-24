import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';

import { UserService } from './user.service';
import { UserModel } from './user.model';
import { AuthService } from './../auth/auth.service';
import { UserController } from './user.controller'
import { getJWTConfig } from '../../config/jwt.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [TypegooseModule.forFeature([
    {
      typegooseClass: UserModel,
      schemaOptions: {
        collection: "User",
      },
    },
    ConfigModule
  ]),
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getJWTConfig
  }),
    PassportModule
  ],
  controllers: [UserController],
  providers: [UserService, AuthService, JwtStrategy]
})

export class UserModule { }

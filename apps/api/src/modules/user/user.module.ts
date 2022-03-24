import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { UserService } from './user.service';
import { UserModel } from './user.model';
import { AuthService } from './../auth/auth.service';
import { UserController } from './user.controller'
import { getJWTConfig } from '../../config/jwt.config';
import { getCollectionConfig } from '../../utils/mongo/getCollectionConfig'


@Module({
  imports: [TypegooseModule.forFeature([
    getCollectionConfig<UserModel>(UserModel, "User"),
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

import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModel } from './../user/user.model';
import { UserService } from './../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getJWTConfig } from '../../config/jwt.config';
import { getCollectionConfig } from '../../utils/mongo/getCollectionConfig'

@Module({
  imports: [
    TypegooseModule.forFeature([
      getCollectionConfig<UserModel>(UserModel, "User"),
      ConfigModule
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJWTConfig
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy]
})
export class AuthModule { }

import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypegooseModule } from 'nestjs-typegoose';

import { UserModel } from './../user/user.model';
import { UserService } from './../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getJWTConfig } from '../../config/jwt.config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypegooseModule.forFeature([
      {
        typegooseClass: UserModel,
        schemaOptions: {
          collection: 'User',
        }
      },
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
  providers: [AuthService, UserModel, UserService, JwtStrategy]
})
export class AuthModule { }

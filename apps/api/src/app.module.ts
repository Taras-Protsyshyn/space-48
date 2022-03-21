import { join } from 'path'
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { configuration } from './config/configuration'
import { validationSchema } from './config/validation'
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './config/mongo.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
      envFilePath: join(__dirname, "/assets", "/envs", ".env"),
    }),
    TypegooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getMongoConfig,
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule { };

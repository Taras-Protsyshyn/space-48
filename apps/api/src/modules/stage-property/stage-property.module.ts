import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypegooseModule, } from 'nestjs-typegoose';

import { StagePropertyController } from './stage-property.controller';
import { StagePropertyService } from './stage-property.service';
import { StagePropertyModel } from './stage-property.model'
import { getCollectionConfig } from '../../utils/mongo/getCollectionConfig'


@Module({
  imports: [TypegooseModule.forFeature([
    getCollectionConfig<StagePropertyModel>(StagePropertyModel, "StageProperty"),
    ConfigModule
  ])],
  controllers: [StagePropertyController],
  providers: [StagePropertyService]
})
export class StagePropertyModule { }

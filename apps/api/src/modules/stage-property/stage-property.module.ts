import { Module } from '@nestjs/common';
import { StagePropertyController } from './stage-property.controller';
import { StagePropertyService } from './stage-property.service';

@Module({
  controllers: [StagePropertyController],
  providers: [StagePropertyService]
})
export class StagePropertyModule { }

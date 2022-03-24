import { StagePropertyDto, EditStagePropertyDto } from './dto/stage-property.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';

import { StagePropertyModel } from './stage-property.model';


@Injectable()
export class StagePropertyService {
  constructor(
    @InjectModel(StagePropertyModel) private stagePropertyModel: ModelType<StagePropertyModel>
  ) { }

  async createStageProperty(dto: StagePropertyDto): Promise<DocumentType<StagePropertyModel>> {
    const newStageProperty = new this.stagePropertyModel(dto);

    return newStageProperty.save()
  }

  async getStageProperties(): Promise<DocumentType<StagePropertyModel>[]> {
    return this.stagePropertyModel.find({}).exec()
  }

  async getStagePropertyById(id: string): Promise<DocumentType<StagePropertyModel> | null> {

    return this.stagePropertyModel.findById(id).exec()
  }

  async findAndDeleteStagePropertyById(id: string): Promise<DocumentType<StagePropertyModel> | null> {

    return this.stagePropertyModel.findByIdAndDelete(id).exec()
  }

  async editStagePropertyById(id: string, dto: EditStagePropertyDto): Promise<DocumentType<StagePropertyModel> | null> {

    return this.stagePropertyModel.findByIdAndUpdate(id, dto, { new: true }).exec()
  }
}

import { ModelType, DocumentType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { Injectable } from '@nestjs/common';

import { UserDto } from './dto/user.dto';
import { UserModel } from './user.model';



@Injectable()
export class UserService {
  constructor(@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>) { }

  async createUser(dto: UserDto): Promise<DocumentType<UserModel>> {
    const newUser = new this.userModel(dto);

    return newUser.save();
  }

  async findUser(login: string) {
    return this.userModel.findOne({ login }).exec();
  }

  async getAllUsers() {
    return this.userModel.find({}).exec()
  }
}

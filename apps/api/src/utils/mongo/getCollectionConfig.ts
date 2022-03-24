import { DocumentType } from '@typegoose/typegoose/lib/types';
import { TypegooseClass, TypegooseClassWithOptions } from 'nestjs-typegoose/dist/typegoose-class.interface';

export const getCollectionConfig = <T>(model: TypegooseClass, collectionName: string): TypegooseClassWithOptions => {

  return {
    typegooseClass: model,
    schemaOptions: {
      collection: collectionName,
      timestamps: true,
      toJSON: {
        transform: (doc: DocumentType<T>, ret) => {
          delete ret.__v;
          ret.id = ret._id;
          delete ret._id;
        }
      }

    },
  }
}

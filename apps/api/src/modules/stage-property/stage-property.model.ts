import { prop } from "@typegoose/typegoose";

export class StagePropertyModel {
  @prop()
  name: string

  @prop()
  description: string

  @prop()
  price: number

  @prop()
  images: string[]
}

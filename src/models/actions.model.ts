import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Actions {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ type: [Object] })
  body: Array<object>;
}

export type ActionsDocument = Actions & Document;
export const ActionsSchema = SchemaFactory.createForClass(Actions);

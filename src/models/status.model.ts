import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class Status {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ type: String})
  status: 'online' | 'offline';
}

export type StatusDocument = Status & Document;
export const StatusSchema = SchemaFactory.createForClass(Status);

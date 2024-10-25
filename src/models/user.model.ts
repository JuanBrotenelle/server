import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema()
export class User {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true })
  id: number;

  @Prop({ type: Types.ObjectId, ref: 'Status' })
  currentStatus: Types.ObjectId;

  @Prop({
    type: {
      IP: String,
      Geo: String,
      Browser: String,
      Cookies: { type: Types.ObjectId, ref: 'Cookie' },
      Actions: { type: Types.ObjectId, ref: 'Actions' },
      History: { type: Types.ObjectId, ref: 'History' },
      Created_at: Date,
      Activity: String,
      Comment: String,
    },
    required: true,
  })
  otherInfo: {
    IP: string;
    Geo: string;
    Browser: string;
    Cookies: Types.ObjectId;
    Actions: Types.ObjectId;
    History: Types.ObjectId;
    Created_at: Date;
    Activity: string;
    Comment: string;
  };
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ 'otherInfo.Comment': 'text', 'otherInfo.IP': 'text' });

import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import * as mongoose from 'mongoose';

export type MailDocument = Mail & Document;
@Schema()
export class Mail {
  @Prop({ required: false })
  uid: string;
  @Prop({ required: true })
  actionType: string;
  @Prop({ required: true })
  from: string;
  @Prop({ required: true })
  to: string;
  @Prop({ required: true })
  subject: string;
  @Prop({ required: true })
  sendAt: Date;
}

export const MailSchema = SchemaFactory.createForClass(Mail);

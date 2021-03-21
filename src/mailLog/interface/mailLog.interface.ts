import { Document } from 'mongoose';

export interface IMail extends Document {
  readonly uid: string;
  readonly actionType: string;
  readonly from: string;
  readonly to: string;
  readonly subject: string;
  readonly sendAt: Date;
}

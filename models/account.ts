import { Schema, model } from 'mongoose'

export interface IAccount {
  id: number;
  name: string;
  email: string;
  password: string;
}

const accountSchema = new Schema<IAccount>(
  {
    id: Number,
    name: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
  }
);

export const Account = model<IAccount>("Account", accountSchema);

import { Schema, model } from "mongoose";

export interface IAccount {
  id: number;
  profileId: number;
  name: string;
  email: string;
  profilePicture: string;
  accessToken: string;
}

const accountSchema = new Schema<IAccount>(
  {
    id: Number,
    profileId: Number,
    name: String,
    email: String,
    profilePicture: String,
    accessToken: String,
  },
  {
    timestamps: true,
  }
);

export const Account = model<IAccount>("Account", accountSchema);

import { Schema, model } from "mongoose";

export interface IComment {
  username: string;
  comment: string;
}

const CommentSchema = new Schema<IComment>(
  {
    username: String,
    comment: String,
  },
  { _id: false, timestamps: true }
);
export interface ITicket {
  save(): unknown;
  _id: string;
  assigneeId: string;
  title: string;
  description: string;
  status: string;
  taskColumn: string;
  dueDate: Date;
  reporterId?: string;
  comments?: IComment[];
}

const ticketSchema = new Schema<ITicket>(
  {
    assigneeId: String,
    title: String,
    description: String,
    status: String,
    taskColumn: String,
    dueDate: Date,
    reporterId: String,
    comments: [CommentSchema],
  },
  {
    timestamps: true,
  }
);

export const Ticket = model<ITicket>("Ticket", ticketSchema);

import { Schema, model } from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

export const Ticket = model<ITicket>("Ticket", ticketSchema);

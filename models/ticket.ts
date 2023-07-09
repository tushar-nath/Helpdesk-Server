import { Schema, model } from "mongoose";

export interface ITicket {
  id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  priority: string;
  assignee: string;
  approver: string;
  comments: string;
}

const ticketSchema = new Schema<ITicket>(
  {
    id: Number,
    title: String,
    description: String,
    type: String,
    status: String,
    priority: String,
    assignee: String,
    approver: String,
    comments: String,
  },
  {
    timestamps: true,
  }
);

export const Ticket = model<ITicket>("Account", ticketSchema);

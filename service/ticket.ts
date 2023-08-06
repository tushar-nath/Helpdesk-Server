import { ITicket, Ticket } from "../models/ticket";

export class TicketService {
  static async getTickets() {
    try {
      const tasks = await Ticket.find();
      return tasks;
    } catch (error) {
      throw error;
    }
  }

  static async getTicketById(ticketId: string) {
    try {
      const ticket = await Ticket.findOne({
        _id: ticketId,
      });
      return ticket;
    } catch (error) {
      throw error;
    }
  }
}

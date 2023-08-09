import { Request, Response } from "express";
import clientPromise from "../../lib/mongo";
import { ITicket, Ticket } from "../../models/ticket";
import { TicketService } from "../../service/ticket";

export class TicketHandler {
  static async createTicket(req: Request, res: Response) {
    try {
      const { title, description, status, dueDate } = req.body;
      const assigneeId = "1";
      const taskColumn = "0"; // set tasks in-queue by default

      await clientPromise;

      const ticket = new Ticket({
        assigneeId,
        title,
        description,
        status,
        taskColumn,
        dueDate,
      }) as ITicket;

      const savedTicket = await ticket.save();
      return res.status(200).json({ savedTicket });
    } catch (error) {
      res.status(400).json("error");
    }
  }

  static async getTickets(req: Request, res: Response) {
    try {
      const allTasks = await TicketService.getTickets();

      //   // Organize the tasks into different columns based on taskColumn value
      const columns: any = {
        0: {
          id: "0",
          title: "In Queue",
          tasks: [],
        },
        1: {
          id: "1",
          title: "In Progress",
          tasks: [],
        },
        2: {
          id: "2",
          title: "Escalated",
          tasks: [],
        },
        3: {
          id: "3",
          title: "Resolved",
          tasks: [],
        },
      };

      allTasks.forEach((task) => {
        const { taskColumn } = task;
        if (columns[taskColumn]) {
          columns[taskColumn].tasks.push(task);
        }
      });

      // Convert the columns object to an array of columns
      const columnsArray = Object.values(columns);

      return res.status(200).json({ columns: columnsArray });
    } catch (error) {
      res.status(400).json("error");
    }
  }

  static async updateTicket(req: Request, res: Response) {
    try {
      const {
        ticketId,
        assigneeId,
        title,
        description,
        status,
        taskColumn,
        dueDate,
      } = req.body;

      const ticket: any = await TicketService.getTicketById(ticketId);

      console.log(ticket);

      if (!ticket) {
        return res.status(400).json({ error: "Ticket not found" });
      }

      const fieldsToUpdate: any = {
        assigneeId,
        title,
        description,
        status,
        taskColumn,
        dueDate,
      };

      for (const field in fieldsToUpdate) {
        if (fieldsToUpdate[field] !== undefined) {
          ticket[field] = fieldsToUpdate[field];
        }
      }

      await ticket.save();

      console.log("updated ticket is", ticket);
      res.status(200).json({ savedTicket: ticket });
    } catch (error) {
      console.error("error is: ", error);
      res.status(400).json({ error: error });
    }
  }
}

import { Request, Response } from "express";
import { Account } from "../../models/account";
import clientPromise from "../../lib/mongo";

export class AccountHandler {
  static async account(req: Request, res: Response) {
    try {
      await clientPromise;
      const account: any = req.user;
      const email = account.email;
      const user = await Account.findOne({ email }).exec();
      if (!user) {
        return res.status(400).json("error");
      }
      res.json({ name: user.name, email: user.email });
    } catch (error) {
      res.status(400).json("error");
    }
  }
}

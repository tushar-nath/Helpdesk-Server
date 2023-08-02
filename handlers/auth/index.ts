import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IAccount } from "../../models/account";
export class Auth {
  static signin(req: Request, res: Response) {
    try {
      const account: any = req.user;
      const payload = {
        userId: account?.profileId,
        email: account.email,
        name: account.name,
      };
      const secretKey = "helloworld";
      const options = { expiresIn: "1h" };
      const token = jwt.sign(payload, secretKey, options);

      res.redirect(`http://localhost:3001/dashboard?token=${token}`);
    } catch (error) {
      res.status(400).json("error");
    }
  }
}

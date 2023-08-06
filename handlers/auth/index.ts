import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { IAccount } from "../../models/account";
import dotenv from "dotenv";

dotenv.config();

const baseUrl = process.env.REACT_APP_URL as string;
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
      const options = { expiresIn: "12h" };
      const token = jwt.sign(payload, secretKey, options);

      res.redirect(`${baseUrl}/dashboard?token=${token}`);
    } catch (error) {
      res.status(400).json("error");
    }
  }
}

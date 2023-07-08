import { Request, Response } from "express";
import { Account } from "../../models/account";
import bcrypt from "bcryptjs";
import clientPromise from "../../lib/mongo";

export class Auth {
  static async signup(req: Request, res: Response) {
    const { name, email, password: passwordToStore } = req.body;
    try {
      await clientPromise;

      const checkAccount = await Account.findOne({ email }).exec();

      if (checkAccount) {
        res.status(404).json({ message: "Account already exist" });
        return;
      }

      const account = new Account({
        name,
        email,
        password: bcrypt.hashSync(passwordToStore),
      });

      await account.save();

      res.status(201).json({ message: "Account created" });
    } catch (error) {
      console.error("Unable to signup", error);
      res.status(500).send({ message: "Unable to signup" });
    }
  }

  static async signin(req: Request, res: Response) {
    const { email, password: passwordToCheck } = req.body;
    try {
      await clientPromise;

      const account = await Account.findOne({ email }).exec();

      if (!account) {
        res.status(404).json({ message: "Account does not exist" });
        return;
      }

      const passwordMatches = bcrypt.compareSync(
        passwordToCheck,
        account.password
      );

      if (!passwordMatches) {
        res.status(400).json({ message: "Incorrect email or password" });
        return;
      }

      const { password: _, ...accountProps } = account.toJSON();

      res.json(accountProps);
    } catch (error) {
      console.error("Unable to sign-in an account", error);
      res.status(500).send({ message: "Unable to sign-in" });
    }
  }
}

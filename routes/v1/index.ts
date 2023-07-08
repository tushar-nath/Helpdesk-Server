import express, { Request, Response } from "express";
import { Auth } from "../../handlers/auth";

const router = express.Router();

// Health check route
router.get("/healthcheck", (req: Request, res: Response) => {
  res.send({ success: true });
});

/*** Auth endpoints ***/
router.post("/signup", Auth.signup)
router.get("/signin", Auth.signin)

export default router;

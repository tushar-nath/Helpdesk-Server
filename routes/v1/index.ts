import express, { NextFunction, Request, Response } from "express";
import { Auth } from "../../handlers/auth";
import { AccountHandler } from "../../handlers/account";
import passport from "passport";
import { authenticateToken } from "../../middleware/authenticateToken";
import { TicketHandler } from "../../handlers/ticket";

const router = express.Router();

/*** Health check route ***/
router.get("/healthcheck", (req: Request, res: Response) => {
  res.send({ success: true });
});

/*** Auth Routes ***/
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  Auth.signin
);
router.get("/auth/google/failure", (req: Request, res: Response) => {
  res.send({ success: "Went wrong" });
});
router.get("/api/user", authenticateToken, AccountHandler.account); // Endpoint to get the user's name and email

/*** Ticket Routes ***/
router.post("/tickets", TicketHandler.createTicket);
router.get("/tickets", TicketHandler.getTickets);
router.patch("/tickets/update", TicketHandler.updateTicket);

export default router;

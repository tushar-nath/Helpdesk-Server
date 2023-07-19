import express, { Request, Response } from "express";
import { Auth } from "../../handlers/auth";
import passport from "passport";

const router = express.Router();

function isLoggedIn(req: any, res: any, next: any) {
  req.user ? next() : res.status(401);
}

// Health check route
router.get("/healthcheck", (req: Request, res: Response) => {
  res.send({ success: true });
});

/*** Auth endpoints ***/
router.post("/signup", Auth.signup);
router.get("/signin", Auth.signin);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3001/protected",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/protected", isLoggedIn, (req: Request, res: Response) => {
  console.log(req.user)
  res.send({ success: "Hello world!", data: req.user });
});

router.get("/auth/google/failure", (req: Request, res: Response) => {
  res.send({ success: "Went wrong" });
});

export default router;

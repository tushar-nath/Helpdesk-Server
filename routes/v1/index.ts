import express, { NextFunction, Request, Response } from "express";
// import { Auth } from "../../handlers/auth";
import passport from "passport";
import jwt from "jsonwebtoken";

const router = express.Router();

function isLoggedIn(req: any, res: any, next: any) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({ error: "Unauthorized" });
  }
}

// Health check route
router.get("/healthcheck", (req: Request, res: Response) => {
  res.send({ success: true });
});

/*** Auth endpoints ***/
// router.post("/signup", Auth.signup);
// router.get("/signin", Auth.signin);

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google"),
  (req: Request, res: Response) => {
    // Generate the JWT and sign it with a secret key
    const payload = {
      userId: req.user.profileId,
      email: req.user.email,
      name: req.user.name,
    };
    const secretKey = "helloworld"; // Replace this with a secure secret key
    const options = { expiresIn: "1h" }; // Set token expiration as needed
    const token = jwt.sign(payload, secretKey, options);

    console.log(token);
    res.redirect(`http://localhost:3001/dashboard?token=${token}`);
  }
);

router.get("/protected", isLoggedIn, (req: Request, res: Response) => {
  console.log(req.user);
  res.send({ success: "Hello world!", data: req.user });
});

router.get("/auth/google/failure", (req: Request, res: Response) => {
  res.send({ success: "Went wrong" });
});

const dummyUser = {
  name: "John Doe",
  email: "john.doe@example.com",
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  console.log("header token ", token);
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    console.log("it has entered");
    const decoded = jwt.verify(token, "helloworld"); // Replace "your-secret-key" with your actual secret key
    console.log("decoded", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Endpoint to get the user's name and email
router.get("/api/user", authenticateToken, (req, res) => {
  res.json({ name: dummyUser.name, email: dummyUser.email });
});

export default router;

import express from "express";
import cors from "cors";
import userRouter from "../routes/v1";
import "../middleware/index";
import session, { SessionOptions } from "express-session";
import passport from "passport";

const app = express();

// Enable CORS
// Enable CORS with credentials
app.use(cors({ origin: "http://192.168.1.3:3001", credentials: true }));

app.use(express.json());

// express sessions
app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", userRouter);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;

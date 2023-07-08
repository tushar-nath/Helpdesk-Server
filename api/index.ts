import express from "express";
import cors from "cors";
import userRouter from "../routes/v1";

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());
app.use("/api/v1", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;

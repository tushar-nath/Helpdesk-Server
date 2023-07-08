import express, { Request, Response } from "express";

const router = express.Router();

// Health check route
router.get("/healthcheck", (req: Request, res: Response) => {
  res.send({ success: true });
});


export default router;

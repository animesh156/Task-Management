
import "dotenv/config";

import express, { type Request, type Response } from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js"

const app = express();
const PORT = Number(process.env.PORT) || 5000;

import { prisma } from "./lib/prisma.js";

// middleware
app.use(express.json());
app.use(cookieParser()); 

app.get("/db-test", async (_req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

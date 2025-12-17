
import "dotenv/config";

import express, { type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js"
import taskRoutes from "./modules/tasks/task.routes.js"

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// middleware
app.use(express.json());
app.use(cookieParser()); 


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

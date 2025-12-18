import "dotenv/config";

import express, { type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import authRoutes from "./modules/auth/auth.routes.js";
import userRoutes from "./modules/users/user.routes.js";
import taskRoutes from "./modules/tasks/task.routes.js";

const app = express();
const PORT = Number(process.env.PORT) || 5000;

/* ------------------- Middleware ------------------- */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/* ------------------- Routes ------------------- */
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok" });
});

/* ------------------- HTTP + SOCKET SERVER ------------------- */
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("🔌 Socket connected:", socket.id);

  // user joins personal room
  socket.on("join", (userId: string) => {
    socket.join(userId);
    console.log(`👤 User ${userId} joined room`);
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

/* ------------------- Start Server ------------------- */
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

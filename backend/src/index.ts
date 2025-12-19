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

const clientUrl =
  process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL_PROD
    : process.env.CLIENT_URL_DEV;


app.use(
  cors({
    origin: clientUrl,
    credentials: true,
  })
);

/* ------------------- Middleware ------------------- */
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
    origin: clientUrl,
    credentials: true,
  },
});

io.on("connection", (socket) => {
  

  // user joins personal room
  socket.on("join", (userId: string) => {
    socket.join(userId);
    
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected:", socket.id);
  });
});

/* ------------------- Start Server ------------------- */
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

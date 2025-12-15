import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";
import { RegisterDto, LoginDto } from "./auth.dto.js";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
};

export class AuthController {
  static async register(req: Request, res: Response) {
    const parsed = RegisterDto.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const { user, token } = await AuthService.register(parsed.data);

    res.cookie("token", token, COOKIE_OPTIONS);
    res.status(201).json(user);
  }

  static async login(req: Request, res: Response) {
    const parsed = LoginDto.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const { user, token } = await AuthService.login(parsed.data);

    res.cookie("token", token, COOKIE_OPTIONS);
    res.json(user);
  }

  static async logout(_: Request, res: Response) {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  }
}

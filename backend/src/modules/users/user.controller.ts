import type { Request, Response } from "express";
import { UserService } from "./user.service.js";
import { UpdateProfileDto } from "./user.dto.js";

export class UserController {
  static async getProfile(req: Request, res: Response) {
    const userId = req.user?.id;

    if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

    const user = await UserService.getProfile(userId);
    res.json(user);
  }

  static async updateProfile(req: Request, res: Response) {
    const userId = req.user!.id;

    const parsed = UpdateProfileDto.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json(parsed.error);
    }

    const user = await UserService.updateProfile(userId, parsed.data);
    res.json(user);
  }
}

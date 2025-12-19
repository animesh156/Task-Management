import { UserService } from "./user.service.js";
import { UpdateProfileDto } from "./user.dto.js";
export class UserController {
    static async getProfile(req, res) {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const user = await UserService.getProfile(userId);
        res.json(user);
    }
    static async updateProfile(req, res) {
        const userId = req.user.id;
        const parsed = UpdateProfileDto.safeParse(req.body);
        if (!parsed.success) {
            return res.status(400).json(parsed.error);
        }
        const user = await UserService.updateProfile(userId, parsed.data);
        res.json(user);
    }
    static async getAll(_req, res) {
        const users = await UserService.getAllUsers();
        res.json(users);
    }
}
//# sourceMappingURL=user.controller.js.map
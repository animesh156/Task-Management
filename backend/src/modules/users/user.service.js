import { UserRepository } from "./user.repository.js";
export class UserService {
    static async getProfile(userId) {
        const user = await UserRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }
    static async getAllUsers() {
        return UserRepository.findAll();
    }
    static async updateProfile(userId, data) {
        return UserRepository.updateName(userId, data.name);
    }
}
//# sourceMappingURL=user.service.js.map
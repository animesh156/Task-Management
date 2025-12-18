import { UserRepository } from "./user.repository.js";
import type { UpdateProfileInput } from "./user.dto.js";

export class UserService {
  static async getProfile(userId: string) {
    const user = await UserRepository.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }


   static async getAllUsers() {
    return UserRepository.findAll();
  }

  static async updateProfile(userId: string, data: UpdateProfileInput) {
    return UserRepository.updateName(userId, data.name);
  }
}

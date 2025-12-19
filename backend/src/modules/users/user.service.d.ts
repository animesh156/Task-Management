import type { UpdateProfileInput } from "./user.dto.js";
export declare class UserService {
    static getProfile(userId: string): Promise<{
        id: string;
        name: string;
        createdAt: Date;
    }>;
    static getAllUsers(): Promise<{
        id: string;
        name: string;
    }[]>;
    static updateProfile(userId: string, data: UpdateProfileInput): Promise<{
        id: string;
        email: string;
        name: string;
    }>;
}
//# sourceMappingURL=user.service.d.ts.map
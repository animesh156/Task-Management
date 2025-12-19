import type { RegisterInput, LoginInput } from "./auth.dto.js";
export declare class AuthService {
    static register(data: RegisterInput): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            createdAt: Date;
        };
        token: string;
    }>;
    static login(data: LoginInput): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        token: string;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map
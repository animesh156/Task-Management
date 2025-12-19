import { AuthRepository } from "./auth.repository.js";
import { hashPassword, comparePassword } from "../../utils/password.js";
import { signToken } from "../../utils/jwt.js";
export class AuthService {
    static async register(data) {
        const existingUser = await AuthRepository.findByEmail(data.email);
        if (existingUser) {
            throw new Error("Email already in use");
        }
        const hashedPassword = await hashPassword(data.password);
        const user = await AuthRepository.createUser({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });
        const token = signToken({ id: user.id });
        return { user, token };
    }
    static async login(data) {
        const user = await AuthRepository.findByEmail(data.email);
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isValid = await comparePassword(data.password, user.password);
        if (!isValid) {
            throw new Error("Invalid credentials");
        }
        const token = signToken({ id: user.id });
        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        };
    }
}
//# sourceMappingURL=auth.service.js.map
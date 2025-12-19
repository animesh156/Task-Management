import { prisma } from "../../lib/prisma.js";
export class AuthRepository {
    static findByEmail(email) {
        return prisma.user.findUnique({
            where: { email },
        });
    }
    static createUser(data) {
        return prisma.user.create({
            data,
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
            },
        });
    }
}

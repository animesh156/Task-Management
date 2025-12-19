import { prisma } from "../../lib/prisma.js";
export class UserRepository {
    static findById(userId) {
        return prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                createdAt: true,
            },
        });
    }
    static findAll() {
        return prisma.user.findMany({
            select: {
                id: true,
                name: true,
            },
        });
    }
    static updateName(userId, name) {
        return prisma.user.update({
            where: { id: userId },
            data: { name },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    }
}

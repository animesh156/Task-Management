import { prisma } from "../../lib/prisma.js";

export class UserRepository {
  static findById(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });
  }

  static updateName(userId: string, name: string) {
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

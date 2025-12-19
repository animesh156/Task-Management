export declare class UserRepository {
    static findById(userId: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        name: string;
        createdAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    static findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        name: string;
    }[]>;
    static updateName(userId: string, name: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        name: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
//# sourceMappingURL=user.repository.d.ts.map
export declare class AuthRepository {
    static findByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        name: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    static createUser(data: {
        name: string;
        email: string;
        password: string;
    }): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
//# sourceMappingURL=auth.repository.d.ts.map
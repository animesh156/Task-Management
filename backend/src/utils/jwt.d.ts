import "dotenv/config";
export interface JwtPayload {
    id: string;
}
export declare const signToken: (payload: JwtPayload) => string;
//# sourceMappingURL=jwt.d.ts.map
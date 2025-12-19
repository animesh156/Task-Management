import type { Request, Response } from "express";
export declare class UserController {
    static getProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static updateProfile(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static getAll(_req: Request, res: Response): Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map
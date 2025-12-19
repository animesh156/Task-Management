import type { Request, Response } from "express";
export declare class TaskController {
    static create(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static update(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static remove(req: Request, res: Response): Promise<void>;
    static getAll(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=task.controller.d.ts.map
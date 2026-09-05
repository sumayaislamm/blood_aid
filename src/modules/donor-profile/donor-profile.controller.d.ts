import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware";
export declare const createProfile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getMyProfile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const updateMyProfile: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=donor-profile.controller.d.ts.map
import type { Response } from "express";
import type { AuthenticatedRequest } from "../../middlewares/auth.middleware";
export declare const createRequest: (req: AuthenticatedRequest, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=blood-request.controller.d.ts.map
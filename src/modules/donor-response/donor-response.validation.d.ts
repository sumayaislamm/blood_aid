import { z } from "zod";
export declare const createDonorResponseSchema: z.ZodObject<{
    bloodRequestId: z.ZodString;
    message: z.ZodString;
}, z.core.$strip>;
export declare const updateDonorResponseSchema: z.ZodObject<{
    status: z.ZodEnum<{
        ACCEPTED: "ACCEPTED";
        CANCELLED: "CANCELLED";
        PENDING: "PENDING";
        REJECTED: "REJECTED";
    }>;
    message: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=donor-response.validation.d.ts.map
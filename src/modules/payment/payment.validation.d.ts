import { z } from "zod";
export declare const createPaymentSchema: z.ZodObject<{
    bloodRequestId: z.ZodString;
    provider: z.ZodEnum<{
        BKASH: "BKASH";
        STRIPE: "STRIPE";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=payment.validation.d.ts.map
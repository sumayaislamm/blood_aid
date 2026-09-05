import { z } from "zod";
export declare const createDonationSchema: z.ZodObject<{
    donationDate: z.ZodString;
    units: z.ZodNumber;
    status: z.ZodOptional<z.ZodEnum<{
        CANCELLED: "CANCELLED";
        COMPLETED: "COMPLETED";
        PENDING: "PENDING";
        VERIFIED: "VERIFIED";
    }>>;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=donation.validation.d.ts.map
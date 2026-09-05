import { z } from "zod";
export declare const createDonorProfileSchema: z.ZodObject<{
    bloodGroup: z.ZodEnum<{
        AB_NEGATIVE: "AB_NEGATIVE";
        AB_POSITIVE: "AB_POSITIVE";
        A_NEGATIVE: "A_NEGATIVE";
        A_POSITIVE: "A_POSITIVE";
        B_NEGATIVE: "B_NEGATIVE";
        B_POSITIVE: "B_POSITIVE";
        O_NEGATIVE: "O_NEGATIVE";
        O_POSITIVE: "O_POSITIVE";
    }>;
    dateOfBirth: z.ZodString;
    gender: z.ZodEnum<{
        FEMALE: "FEMALE";
        MALE: "MALE";
        OTHER: "OTHER";
    }>;
    city: z.ZodString;
    area: z.ZodString;
    lastDonationDate: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateDonorProfileSchema: z.ZodObject<{
    bloodGroup: z.ZodOptional<z.ZodEnum<{
        AB_NEGATIVE: "AB_NEGATIVE";
        AB_POSITIVE: "AB_POSITIVE";
        A_NEGATIVE: "A_NEGATIVE";
        A_POSITIVE: "A_POSITIVE";
        B_NEGATIVE: "B_NEGATIVE";
        B_POSITIVE: "B_POSITIVE";
        O_NEGATIVE: "O_NEGATIVE";
        O_POSITIVE: "O_POSITIVE";
    }>>;
    dateOfBirth: z.ZodOptional<z.ZodString>;
    gender: z.ZodOptional<z.ZodEnum<{
        FEMALE: "FEMALE";
        MALE: "MALE";
        OTHER: "OTHER";
    }>>;
    city: z.ZodOptional<z.ZodString>;
    area: z.ZodOptional<z.ZodString>;
    lastDonationDate: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
//# sourceMappingURL=donor-profile.validation.d.ts.map
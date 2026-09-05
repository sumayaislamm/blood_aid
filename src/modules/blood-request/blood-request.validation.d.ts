import { z } from "zod";
export declare const createBloodRequestSchema: z.ZodObject<{
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
    units: z.ZodNumber;
    hospitalName: z.ZodString;
    hospitalAddress: z.ZodString;
    city: z.ZodString;
    requiredDate: z.ZodString;
    urgency: z.ZodEnum<{
        CRITICAL: "CRITICAL";
        NORMAL: "NORMAL";
        URGENT: "URGENT";
    }>;
    isPriority: z.ZodOptional<z.ZodBoolean>;
    description: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const updateBloodRequestSchema: z.ZodObject<{
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
    units: z.ZodOptional<z.ZodNumber>;
    hospitalName: z.ZodOptional<z.ZodString>;
    hospitalAddress: z.ZodOptional<z.ZodString>;
    city: z.ZodOptional<z.ZodString>;
    requiredDate: z.ZodOptional<z.ZodString>;
    urgency: z.ZodOptional<z.ZodEnum<{
        CRITICAL: "CRITICAL";
        NORMAL: "NORMAL";
        URGENT: "URGENT";
    }>>;
    isPriority: z.ZodOptional<z.ZodOptional<z.ZodBoolean>>;
    description: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
//# sourceMappingURL=blood-request.validation.d.ts.map
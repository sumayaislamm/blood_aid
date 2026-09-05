import { z } from "zod";

export const createBloodRequestSchema = z.object({
  bloodGroup: z.enum([
    "A_POSITIVE",
    "A_NEGATIVE",
    "B_POSITIVE",
    "B_NEGATIVE",
    "AB_POSITIVE",
    "AB_NEGATIVE",
    "O_POSITIVE",
    "O_NEGATIVE",
  ]),

  units: z.number().int().positive(),

  hospitalName: z.string().min(2),
  hospitalAddress: z.string().min(2),
  city: z.string().min(2),

  requiredDate: z.string().datetime(),

  urgency: z.enum([
    "NORMAL",
    "URGENT",
    "CRITICAL",
  ]),

  isPriority: z.boolean().optional(),

  description: z.string().optional(),
});

export const updateBloodRequestSchema =
  createBloodRequestSchema.partial();
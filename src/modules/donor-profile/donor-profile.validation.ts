import { z } from "zod";

export const createDonorProfileSchema = z.object({
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

  dateOfBirth: z.string().datetime(),

  gender: z.enum([
    "MALE",
    "FEMALE",
    "OTHER",
  ]),

  city: z.string().min(2),

  area: z.string().min(2),

  lastDonationDate: z.string().datetime().optional(),
});

export const updateDonorProfileSchema =
  createDonorProfileSchema.partial();
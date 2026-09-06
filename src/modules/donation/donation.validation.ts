import { z } from "zod";

export const createDonationSchema = z.object({
  donationDate: z.string().datetime(),
  units: z.number().int().positive(),
  status: z
    .enum(["PENDING", "COMPLETED", "VERIFIED", "CANCELLED"])
    .optional(),
  notes: z.string().max(500).optional(),
});

export const updateDonationStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "COMPLETED",
    "VERIFIED",
    "CANCELLED",
  ]),
});
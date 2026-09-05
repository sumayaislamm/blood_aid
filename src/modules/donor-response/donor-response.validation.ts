import { z } from "zod";

export const createDonorResponseSchema = z.object({
  bloodRequestId: z.string().uuid(),

  message: z.string().min(5).max(500),
});

export const updateDonorResponseSchema = z.object({
  status: z.enum([
    "PENDING",
    "ACCEPTED",
    "REJECTED",
    "CANCELLED",
  ]),

  message: z.string().min(5).max(500).optional(),
});
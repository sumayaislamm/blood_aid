import { z } from "zod";

export const createPaymentSchema = z.object({
  bloodRequestId: z.string().uuid(),
  provider: z.enum(["STRIPE", "BKASH"]),
}); 
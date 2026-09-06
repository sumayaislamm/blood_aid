import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  password: z.string().min(8).max(100),
  phone: z.string().min(10).max(15).optional(),
  role: z.enum(["DONOR", "REQUESTER"]),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
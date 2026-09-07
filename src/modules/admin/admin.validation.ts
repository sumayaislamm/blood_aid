import { z } from "zod";

export const getUsersQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  role: z.enum(["ADMIN", "DONOR", "REQUESTER"]).optional(),
  status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]).optional(),
  sortBy: z
    .enum(["createdAt", "updatedAt", "name", "email", "role", "status"])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const updateUserStatusSchema = z.object({
  status: z.enum(["ACTIVE", "BLOCKED", "DELETED"]),
});
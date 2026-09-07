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

export const getAdminBloodRequestsQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  bloodGroup: z
    .enum([
      "A_POSITIVE",
      "A_NEGATIVE",
      "B_POSITIVE",
      "B_NEGATIVE",
      "AB_POSITIVE",
      "AB_NEGATIVE",
      "O_POSITIVE",
      "O_NEGATIVE",
    ])
    .optional(),
  urgency: z
    .enum(["NORMAL", "URGENT", "CRITICAL"])
    .optional(),
  status: z
    .enum([
      "PENDING",
      "MATCHED",
      "FULFILLED",
      "CANCELLED",
      "EXPIRED",
    ])
    .optional(),
  city: z.string().optional(),
  sortBy: z
    .enum([
      "createdAt",
      "updatedAt",
      "requiredDate",
      "units",
      "urgency",
      "status",
    ])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});

export const updateBloodRequestStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "MATCHED",
    "FULFILLED",
    "CANCELLED",
    "EXPIRED",
  ]),
});

export const getAdminDonationsQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  status: z
    .enum(["PENDING", "COMPLETED", "VERIFIED", "CANCELLED"])
    .optional(),
  sortBy: z
    .enum([
      "createdAt",
      "updatedAt",
      "donationDate",
      "units",
      "status",
    ])
    .optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
});
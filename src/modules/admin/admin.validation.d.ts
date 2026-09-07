import { z } from "zod";
export declare const getUsersQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        ADMIN: "ADMIN";
        DONOR: "DONOR";
        REQUESTER: "REQUESTER";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        ACTIVE: "ACTIVE";
        BLOCKED: "BLOCKED";
        DELETED: "DELETED";
    }>>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        createdAt: "createdAt";
        email: "email";
        name: "name";
        role: "role";
        status: "status";
        updatedAt: "updatedAt";
    }>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export declare const updateUserStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        ACTIVE: "ACTIVE";
        BLOCKED: "BLOCKED";
        DELETED: "DELETED";
    }>;
}, z.core.$strip>;
export declare const getAdminBloodRequestsQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
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
    urgency: z.ZodOptional<z.ZodEnum<{
        CRITICAL: "CRITICAL";
        NORMAL: "NORMAL";
        URGENT: "URGENT";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        CANCELLED: "CANCELLED";
        EXPIRED: "EXPIRED";
        FULFILLED: "FULFILLED";
        MATCHED: "MATCHED";
        PENDING: "PENDING";
    }>>;
    city: z.ZodOptional<z.ZodString>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        createdAt: "createdAt";
        requiredDate: "requiredDate";
        status: "status";
        units: "units";
        updatedAt: "updatedAt";
        urgency: "urgency";
    }>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export declare const updateBloodRequestStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        CANCELLED: "CANCELLED";
        EXPIRED: "EXPIRED";
        FULFILLED: "FULFILLED";
        MATCHED: "MATCHED";
        PENDING: "PENDING";
    }>;
}, z.core.$strip>;
export declare const getAdminDonationsQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    status: z.ZodOptional<z.ZodEnum<{
        CANCELLED: "CANCELLED";
        COMPLETED: "COMPLETED";
        PENDING: "PENDING";
        VERIFIED: "VERIFIED";
    }>>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        createdAt: "createdAt";
        donationDate: "donationDate";
        status: "status";
        units: "units";
        updatedAt: "updatedAt";
    }>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export declare const getAdminPaymentsQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    provider: z.ZodOptional<z.ZodEnum<{
        BKASH: "BKASH";
        STRIPE: "STRIPE";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        FAILED: "FAILED";
        PAID: "PAID";
        PENDING: "PENDING";
        REFUNDED: "REFUNDED";
    }>>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        amount: "amount";
        createdAt: "createdAt";
        paidAt: "paidAt";
        provider: "provider";
        status: "status";
        updatedAt: "updatedAt";
    }>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export declare const getAdminAuditLogsQuerySchema: z.ZodObject<{
    page: z.ZodOptional<z.ZodString>;
    limit: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    action: z.ZodOptional<z.ZodString>;
    entity: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
//# sourceMappingURL=admin.validation.d.ts.map
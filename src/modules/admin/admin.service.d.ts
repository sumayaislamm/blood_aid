import type { GetAdminAuditLogsQuery, GetAdminBloodRequestsQuery, GetAdminDonationsQuery, GetAdminPaymentsQuery, GetUsersQuery, UpdateBloodRequestStatusInput, UpdateUserStatusInput } from "./admin.interface";
export declare const getAllUsers: (query: GetUsersQuery) => Promise<{
    users: {
        avatar: string | null;
        createdAt: Date;
        deletedAt: Date | null;
        email: string;
        googleId: string | null;
        id: string;
        name: string;
        phone: string | null;
        role: import("../../../generated/prisma/enums").UserRole;
        status: import("../../../generated/prisma/enums").UserStatus;
        updatedAt: Date;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const updateUserStatus: (adminId: string, userId: string, data: UpdateUserStatusInput) => Promise<{
    createdAt: Date;
    deletedAt: Date | null;
    email: string;
    id: string;
    name: string;
    phone: string | null;
    role: import("../../../generated/prisma/enums").UserRole;
    status: import("../../../generated/prisma/enums").UserStatus;
    updatedAt: Date;
}>;
export declare const verifyDonation: (adminId: string, donationId: string) => Promise<{
    id: string;
    bloodRequestId: string;
    donorId: string;
    responseId: string;
    status: import("../../../generated/prisma/enums").DonationStatus;
    donationDate: Date;
    units: number;
    verifiedAt: Date | null;
    notes: string | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getAdminBloodRequests: (query: GetAdminBloodRequestsQuery) => Promise<{
    bloodRequests: ({
        _count: {
            donations: number;
            payments: number;
            responses: number;
        };
        requester: {
            email: string;
            id: string;
            name: string;
            phone: string | null;
        };
    } & {
        id: string;
        requesterId: string;
        bloodGroup: import("../../../generated/prisma/enums").BloodGroup;
        units: number;
        amount: import("@prisma/client-runtime-utils").Decimal;
        hospitalName: string;
        hospitalAddress: string;
        city: string;
        requiredDate: Date;
        urgency: import("../../../generated/prisma/enums").Urgency;
        status: import("../../../generated/prisma/enums").BloodRequestStatus;
        isPriority: boolean;
        description: string | null;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const updateBloodRequestStatus: (adminId: string, bloodRequestId: string, data: UpdateBloodRequestStatusInput) => Promise<{
    id: string;
    requesterId: string;
    bloodGroup: import("../../../generated/prisma/enums").BloodGroup;
    units: number;
    amount: import("@prisma/client-runtime-utils").Decimal;
    hospitalName: string;
    hospitalAddress: string;
    city: string;
    requiredDate: Date;
    urgency: import("../../../generated/prisma/enums").Urgency;
    status: import("../../../generated/prisma/enums").BloodRequestStatus;
    isPriority: boolean;
    description: string | null;
    deletedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getAdminDonations: (query: GetAdminDonationsQuery) => Promise<{
    donations: ({
        bloodRequest: {
            bloodGroup: import("../../../generated/prisma/enums").BloodGroup;
            city: string;
            hospitalName: string;
            id: string;
            status: import("../../../generated/prisma/enums").BloodRequestStatus;
            units: number;
        };
        donor: {
            email: string;
            id: string;
            name: string;
            phone: string | null;
        };
        response: {
            id: string;
            message: string | null;
            respondedAt: Date | null;
            status: import("../../../generated/prisma/enums").DonorResponseStatus;
        };
    } & {
        id: string;
        bloodRequestId: string;
        donorId: string;
        responseId: string;
        status: import("../../../generated/prisma/enums").DonationStatus;
        donationDate: Date;
        units: number;
        verifiedAt: Date | null;
        notes: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getAdminPayments: (query: GetAdminPaymentsQuery) => Promise<{
    payments: ({
        bloodRequest: {
            amount: import("@prisma/client-runtime-utils").Decimal;
            bloodGroup: import("../../../generated/prisma/enums").BloodGroup;
            city: string;
            hospitalName: string;
            id: string;
            status: import("../../../generated/prisma/enums").BloodRequestStatus;
            units: number;
        };
        requester: {
            email: string;
            id: string;
            name: string;
            phone: string | null;
        };
    } & {
        id: string;
        requesterId: string;
        bloodRequestId: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        currency: string;
        provider: import("../../../generated/prisma/enums").PaymentProvider;
        transactionId: string | null;
        status: import("../../../generated/prisma/enums").PaymentStatus;
        paidAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
export declare const getAdminStats: () => Promise<{
    users: {
        total: number;
        donors: number;
        requesters: number;
    };
    bloodRequests: {
        total: number;
        pending: number;
    };
    donations: {
        total: number;
        completed: number;
        verified: number;
    };
    payments: {
        total: number;
        paid: number;
        pending: number;
        paidAmount: number | import("@prisma/client-runtime-utils").Decimal;
        currency: string;
    };
}>;
export declare const getAdminAuditLogs: (query: GetAdminAuditLogsQuery) => Promise<{
    auditLogs: ({
        user: {
            email: string;
            id: string;
            name: string;
            role: import("../../../generated/prisma/enums").UserRole;
        };
    } & {
        id: string;
        userId: string;
        action: string;
        entity: string;
        entityId: string;
        details: import("@prisma/client/runtime/client").JsonValue | null;
        ipAddress: string | null;
        createdAt: Date;
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}>;
//# sourceMappingURL=admin.service.d.ts.map
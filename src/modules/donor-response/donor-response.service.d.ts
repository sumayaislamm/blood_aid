import type { CreateDonorResponseInput, UpdateDonorResponseInput } from "./donor-response.interface";
export declare const createDonorResponse: (donorId: string, data: CreateDonorResponseInput) => Promise<{
    id: string;
    bloodRequestId: string;
    donorId: string;
    status: import("../../../generated/prisma/enums").DonorResponseStatus;
    message: string | null;
    respondedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getMyDonorResponses: (donorId: string) => Promise<({
    bloodRequest: {
        id: string;
        requesterId: string;
        bloodGroup: import("../../../generated/prisma/enums").BloodGroup;
        units: number;
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
    };
} & {
    id: string;
    bloodRequestId: string;
    donorId: string;
    status: import("../../../generated/prisma/enums").DonorResponseStatus;
    message: string | null;
    respondedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
})[]>;
export declare const updateMyDonorResponse: (donorId: string, responseId: string, data: UpdateDonorResponseInput) => Promise<{
    id: string;
    bloodRequestId: string;
    donorId: string;
    status: import("../../../generated/prisma/enums").DonorResponseStatus;
    message: string | null;
    respondedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=donor-response.service.d.ts.map
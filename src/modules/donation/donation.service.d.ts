import type { CreateDonationInput } from "./donation.interface";
export declare const createDonation: (donorId: string, responseId: string, data: CreateDonationInput) => Promise<{
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
export declare const getMyDonations: (donorId: string) => Promise<({
    bloodRequest: {
        bloodGroup: import("../../../generated/prisma/enums").BloodGroup;
        city: string;
        hospitalAddress: string;
        hospitalName: string;
        id: string;
        requiredDate: Date;
        status: import("../../../generated/prisma/enums").BloodRequestStatus;
        units: number;
        urgency: import("../../../generated/prisma/enums").Urgency;
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
})[]>;
export declare const getDonationById: (userId: string, donationId: string) => Promise<{
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
    donor: {
        email: string;
        id: string;
        name: string;
        phone: string | null;
    };
    response: {
        id: string;
        bloodRequestId: string;
        donorId: string;
        status: import("../../../generated/prisma/enums").DonorResponseStatus;
        message: string | null;
        respondedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
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
}>;
//# sourceMappingURL=donation.service.d.ts.map
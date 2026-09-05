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
//# sourceMappingURL=donation.service.d.ts.map
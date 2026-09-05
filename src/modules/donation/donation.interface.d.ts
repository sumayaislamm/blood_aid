import type { DonationStatus } from "../../../generated/prisma/enums";
export interface CreateDonationInput {
    donationDate: string;
    units: number;
    status?: DonationStatus;
    notes?: string;
}
export interface UpdateDonationStatusInput {
    status: DonationStatus;
}
//# sourceMappingURL=donation.interface.d.ts.map
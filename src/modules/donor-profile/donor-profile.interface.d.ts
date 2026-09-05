import type { BloodGroup, Gender } from "../../../generated/prisma/enums";
export interface CreateDonorProfileInput {
    bloodGroup: BloodGroup;
    dateOfBirth: string;
    gender: Gender;
    city: string;
    area: string;
    lastDonationDate?: string;
}
//# sourceMappingURL=donor-profile.interface.d.ts.map
import type { CreateDonorProfileInput } from "./donor-profile.interface";
export declare const createDonorProfile: (userId: string, data: CreateDonorProfileInput) => Promise<{
    id: string;
    userId: string;
    bloodGroup: import("../../../generated/prisma/enums").BloodGroup;
    dateOfBirth: Date;
    gender: import("../../../generated/prisma/enums").Gender;
    city: string;
    area: string;
    lastDonationDate: Date | null;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare const getMyDonorProfile: (userId: string) => Promise<{
    id: string;
    userId: string;
    bloodGroup: import("../../../generated/prisma/enums").BloodGroup;
    dateOfBirth: Date;
    gender: import("../../../generated/prisma/enums").Gender;
    city: string;
    area: string;
    lastDonationDate: Date | null;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
} | null>;
export declare const updateMyDonorProfile: (userId: string, data: Partial<CreateDonorProfileInput>) => Promise<{
    id: string;
    userId: string;
    bloodGroup: import("../../../generated/prisma/enums").BloodGroup;
    dateOfBirth: Date;
    gender: import("../../../generated/prisma/enums").Gender;
    city: string;
    area: string;
    lastDonationDate: Date | null;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=donor-profile.service.d.ts.map
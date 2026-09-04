import type { CreateBloodRequestInput } from "./blood-request.interface";
export declare const createBloodRequest: (requesterId: string, data: CreateBloodRequestInput) => Promise<{
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
}>;
//# sourceMappingURL=blood-request.service.d.ts.map
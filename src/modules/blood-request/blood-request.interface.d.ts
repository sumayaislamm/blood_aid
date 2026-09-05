import type { BloodGroup, Urgency } from "../../../generated/prisma/enums";
export interface CreateBloodRequestInput {
    bloodGroup: "A_POSITIVE" | "A_NEGATIVE" | "B_POSITIVE" | "B_NEGATIVE" | "AB_POSITIVE" | "AB_NEGATIVE" | "O_POSITIVE" | "O_NEGATIVE";
    units: number;
    hospitalName: string;
    hospitalAddress: string;
    city: string;
    requiredDate: string;
    urgency: "NORMAL" | "URGENT" | "CRITICAL";
    isPriority?: boolean;
    description?: string;
}
export interface UpdateBloodRequestInput {
    bloodGroup?: BloodGroup;
    units?: number;
    hospitalName?: string;
    hospitalAddress?: string;
    city?: string;
    requiredDate?: string;
    urgency?: Urgency;
    isPriority?: boolean;
    description?: string | null;
}
export interface GetBloodRequestsQuery {
    page?: string;
    limit?: string;
    bloodGroup?: string;
    urgency?: string;
    status?: string;
    city?: string;
    sortBy?: string;
    sortOrder?: string;
}
//# sourceMappingURL=blood-request.interface.d.ts.map
import type { DonorResponseStatus } from "../../../generated/prisma/enums";
export interface CreateDonorResponseInput {
    bloodRequestId: string;
    message?: string;
}
export interface UpdateDonorResponseInput {
    status: DonorResponseStatus;
    message?: string;
}
export interface UpdateDonorResponseStatusInput {
    status: DonorResponseStatus;
}
//# sourceMappingURL=donor-response.interface.d.ts.map
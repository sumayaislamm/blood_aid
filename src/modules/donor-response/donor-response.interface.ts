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
export interface GetMyDonorResponsesQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}
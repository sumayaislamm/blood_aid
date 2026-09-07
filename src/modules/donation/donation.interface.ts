import type { DonationStatus } from "../../../generated/prisma/enums.js";

export interface CreateDonationInput {
  donationDate: string;
  units: number;
  status?: DonationStatus;
  notes?: string;
}

export interface UpdateDonationStatusInput {
  status: DonationStatus;
}

export interface GetMyDonationsQuery {
  page?: string;
  limit?: string;
  sortBy?: string;
  sortOrder?: string;
}
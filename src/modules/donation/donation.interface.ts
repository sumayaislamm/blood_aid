import type { DonationStatus } from "../../../generated/prisma/enums";

export interface CreateDonationInput {
  donationDate: string;
  units: number;
  status?: DonationStatus;
  notes?: string;
}
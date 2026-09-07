import type { BloodGroup, Gender } from "../../../generated/prisma/enums.js";

export interface CreateDonorProfileInput {
  bloodGroup: BloodGroup;
  dateOfBirth: string;
  gender: Gender;
  city: string;
  area: string;
  lastDonationDate?: string;
}
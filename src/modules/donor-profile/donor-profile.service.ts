import { prisma } from "../../lib/prisma";
import type { CreateDonorProfileInput } from "./donor-profile.interface";

export const createDonorProfile = async (
  userId: string,
  data: CreateDonorProfileInput
) => {
  const profile = await prisma.donorProfile.create({
    data: {
      userId,
      bloodGroup: data.bloodGroup,
      dateOfBirth: new Date(data.dateOfBirth),
      gender: data.gender,
      city: data.city,
      area: data.area,

      ...(data.lastDonationDate
        ? { lastDonationDate: new Date(data.lastDonationDate) }
        : {}),
    },
  });

  return profile;
};

// Get donor profile by userId
export const getMyDonorProfile = async (userId: string) => {
  const profile = await prisma.donorProfile.findUnique({
    where: {
      userId,
    },
  });

  return profile;
};

// Update donor profile by userId
export const updateMyDonorProfile = async (
  userId: string,
  data: Partial<CreateDonorProfileInput>
) => {
  const profile = await prisma.donorProfile.update({
    where: {
      userId,
    },
    data: {
      ...(data.bloodGroup && {
        bloodGroup: data.bloodGroup,
      }),
      ...(data.dateOfBirth && {
        dateOfBirth: new Date(data.dateOfBirth),
      }),
      ...(data.gender && {
        gender: data.gender,
      }),
      ...(data.city && {
        city: data.city,
      }),
      ...(data.area && {
        area: data.area,
      }),
      ...(data.lastDonationDate && {
        lastDonationDate: new Date(data.lastDonationDate),
      }),
    },
  });

  return profile;
};
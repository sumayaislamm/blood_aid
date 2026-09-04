import { prisma } from "../../lib/prisma";
import type { CreateBloodRequestInput, UpdateBloodRequestInput } from "./blood-request.interface";


//Creates a new blood request in the database
export const createBloodRequest = async (
  requesterId: string,
  data: CreateBloodRequestInput
  
) => {
  const bloodRequest = await prisma.bloodRequest.create({
    data: {
      requesterId,
      bloodGroup: data.bloodGroup,
      units: data.units,
      hospitalName: data.hospitalName,
      hospitalAddress: data.hospitalAddress,
      city: data.city,
      requiredDate: new Date(data.requiredDate),
      urgency: data.urgency,
      isPriority: data.isPriority ?? false,
      description: data.description ?? null,
    },
  });

  return bloodRequest;
};

//Fetches all blood requests from the database

export const getAllBloodRequests = async () => {
  const requests = await prisma.bloodRequest.findMany({
    where: {
      deletedAt: null,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return requests;
};

//Fetches a blood request by its ID from the database
export const getBloodRequestById = async (id: string) => {
  const request = await prisma.bloodRequest.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });

  return request;
};

//Updates a blood request in the database

export const updateBloodRequest = async (
  id: string,
  requesterId: string,
  data: UpdateBloodRequestInput
) => {
  const request = await prisma.bloodRequest.findFirst({
    where: {
      id,
      requesterId,
      deletedAt: null,
    },
  });

  if (!request) {
    return null;
  }

  const updatedRequest = await prisma.bloodRequest.update({
    where: {
      id,
    },
    data: {
      ...(data.bloodGroup !== undefined && {
        bloodGroup: data.bloodGroup,
      }),
      ...(data.units !== undefined && {
        units: data.units,
      }),
      ...(data.hospitalName !== undefined && {
        hospitalName: data.hospitalName,
      }),
      ...(data.hospitalAddress !== undefined && {
        hospitalAddress: data.hospitalAddress,
      }),
      ...(data.city !== undefined && {
        city: data.city,
      }),
      ...(data.requiredDate !== undefined && {
        requiredDate: new Date(data.requiredDate),
      }),
      ...(data.urgency !== undefined && {
        urgency: data.urgency,
      }),
      ...(data.isPriority !== undefined && {
        isPriority: data.isPriority,
      }),
      ...(data.description !== undefined && {
        description: data.description,
      }),
    },
  });

  return updatedRequest;
};


//Deletes a blood request from the database
export const deleteBloodRequest = async (
  id: string,
  requesterId: string
) => {
  const request = await prisma.bloodRequest.findFirst({
    where: {
      id,
      requesterId,
      deletedAt: null,
    },
  });

  if (!request) {
    return null;
  }

  const deletedRequest = await prisma.bloodRequest.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });

  return deletedRequest;
};
import { prisma } from "../../lib/prisma";
import type { CreateBloodRequestInput, GetBloodRequestsQuery, UpdateBloodRequestInput } from "./blood-request.interface";


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

export const getAllBloodRequests = async (
  query: GetBloodRequestsQuery
) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(
    Math.max(Number(query.limit) || 10, 1),
    100
  );

  const skip = (page - 1) * limit;

  const where: any = {
    deletedAt: null,
  };

  if (query.bloodGroup) {
    where.bloodGroup = query.bloodGroup;
  }

  if (query.urgency) {
    where.urgency = query.urgency;
  }

  if (query.status) {
    where.status = query.status;
  }

  if (query.city) {
    where.city = {
      contains: query.city,
      mode: "insensitive",
    };
  }

  const allowedSortFields = [
    "createdAt",
    "requiredDate",
    "units",
  ];

  const sortBy = allowedSortFields.includes(query.sortBy || "")
    ? query.sortBy!
    : "createdAt";

  const sortOrder =
    query.sortOrder === "asc" ? "asc" : "desc";

  const [requests, total] = await Promise.all([
    prisma.bloodRequest.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy]: sortOrder,
      },
    }),

    prisma.bloodRequest.count({
      where,
    }),
  ]);

  return {
    requests,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
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


// Fetches all donor responses for a specific blood request
export const getBloodRequestResponses = async (
  requesterId: string,
  bloodRequestId: string
) => {
  const bloodRequest = await prisma.bloodRequest.findUnique({
    where: {
      id: bloodRequestId,
    },
  });

  if (!bloodRequest) {
    throw new Error("Blood request not found");
  }

  if (bloodRequest.requesterId !== requesterId) {
    throw new Error(
      "You can only view responses to your own blood requests"
    );
  }

  const responses = await prisma.donorResponse.findMany({
    where: {
      bloodRequestId,
    },
    include: {
      donor: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          donorProfile: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return responses;
};
import { prisma } from "../../lib/prisma.js";
import type { CreateDonorResponseInput, UpdateDonorResponseInput, UpdateDonorResponseStatusInput } from "./donor-response.interface.js";

export const createDonorResponse = async (
  donorId: string,
  data: CreateDonorResponseInput
) => {
  const request = await prisma.bloodRequest.findUnique({
    where: {
      id: data.bloodRequestId,
    },
  });

  if (!request) {
    throw new Error("Blood request not found");
  }

  if (request.status !== "PENDING") {
    throw new Error("This blood request is no longer accepting responses");
  }

  const existingResponse = await prisma.donorResponse.findUnique({
    where: {
      bloodRequestId_donorId: {
        bloodRequestId: data.bloodRequestId,
        donorId,
      },
    },
  });

  if (existingResponse) {
    throw new Error("You have already responded to this blood request");
  }

const response = await prisma.donorResponse.create({
  data: {
    bloodRequestId: data.bloodRequestId,
    donorId,

    ...(data.message
      ? { message: data.message }
      : {}),
  },
});

  return response;
};

// Get all donor responses for a specific donor
export const getMyDonorResponses = async (
  donorId: string,
  query: {
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: string;
  }
) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);

  const allowedSortFields = [
    "createdAt",
    "updatedAt",
    "status",
    "respondedAt",
  ];

  const sortBy = allowedSortFields.includes(query.sortBy || "")
    ? query.sortBy!
    : "createdAt";

  const sortOrder =
    query.sortOrder === "asc" ? "asc" : "desc";

  const skip = (page - 1) * limit;

  const [responses, total] = await Promise.all([
    prisma.donorResponse.findMany({
      where: {
        donorId,
      },
      include: {
        bloodRequest: true,
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      skip,
      take: limit,
    }),

    prisma.donorResponse.count({
      where: {
        donorId,
      },
    }),
  ]);

  return {
    responses,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};


// Update a donor response for a specific donor
export const updateMyDonorResponse = async (
  donorId: string,
  responseId: string,
  data: UpdateDonorResponseInput
) => {
  const response = await prisma.donorResponse.findUnique({
    where: {
      id: responseId,
    },
  });

  if (!response) {
    throw new Error("Donor response not found");
  }

  if (response.donorId !== donorId) {
    throw new Error("You can only update your own response");
  }

  if (response.status !== "PENDING") {
    throw new Error("Only pending responses can be updated");
  }

  const updatedResponse = await prisma.donorResponse.update({
    where: {
      id: responseId,
    },
    data: {
      status: data.status,
      ...(data.message !== undefined
        ? { message: data.message }
        : {}),
      ...(data.status === "CANCELLED"
        ? { respondedAt: new Date() }
        : {}),
    },
  });

  return updatedResponse;
};

// Update the status of a donor response for a specific blood request

// export const updateDonorResponseStatus = async (
//   requesterId: string,
//   responseId: string,
//   data: UpdateDonorResponseStatusInput
// ) => {
//   const response = await prisma.donorResponse.findUnique({
//     where: {
//       id: responseId,
//     },
//     include: {
//       bloodRequest: true,
//     },
//   });

//   if (!response) {
//     throw new Error("Donor response not found");
//   }

//   if (response.bloodRequest.requesterId !== requesterId) {
//     throw new Error(
//       "You can only manage responses to your own blood requests"
//     );
//   }

//   if (response.status !== "PENDING") {
//     throw new Error("Only pending responses can be accepted or rejected");
//   }

//   if (data.status !== "ACCEPTED" && data.status !== "REJECTED") {
//     throw new Error("Status must be ACCEPTED or REJECTED");
//   }

//   const updatedResponse = await prisma.donorResponse.update({
//     where: {
//       id: responseId,
//     },
//     data: {
//       status: data.status,
//       respondedAt: new Date(),
//     },
//   });

//   return updatedResponse;
// };


export const updateDonorResponseStatus = async (
  requesterId: string,
  responseId: string,
  data: UpdateDonorResponseStatusInput,
) => {
  if (
    data.status !== "ACCEPTED" &&
    data.status !== "REJECTED"
  ) {
    throw new Error("Status must be ACCEPTED or REJECTED");
  }

  return prisma.$transaction(async (tx) => {
    const response = await tx.donorResponse.findUnique({
      where: { id: responseId },
      include: { bloodRequest: true },
    });

    if (!response) {
      throw new Error("Donor response not found");
    }

    if (response.bloodRequest.requesterId !== requesterId) {
      throw new Error(
        "You can only manage responses to your own blood requests",
      );
    }

    if (response.status !== "PENDING") {
      throw new Error(
        "Only pending responses can be accepted or rejected",
      );
    }

    if (response.bloodRequest.status !== "PENDING") {
      throw new Error(
        "This blood request is no longer accepting responses",
      );
    }

    // Rejecting a donor does not close the request.
    if (data.status === "REJECTED") {
      return tx.donorResponse.update({
        where: { id: responseId },
        data: {
          status: "REJECTED",
          respondedAt: new Date(),
        },
      });
    }

    // Atomically reserve the request for one selected donor.
    const matchedRequest = await tx.bloodRequest.updateMany({
      where: {
        id: response.bloodRequestId,
        requesterId,
        status: "PENDING",
      },
      data: {
        status: "MATCHED",
      },
    });

    if (matchedRequest.count !== 1) {
      throw new Error(
        "This blood request has already been matched",
      );
    }

    // Accept the selected donor.
    const acceptedResponse = await tx.donorResponse.update({
      where: { id: responseId },
      data: {
        status: "ACCEPTED",
        respondedAt: new Date(),
      },
    });

    // Reject every other pending donor response.
    await tx.donorResponse.updateMany({
      where: {
        bloodRequestId: response.bloodRequestId,
        id: { not: responseId },
        status: "PENDING",
      },
      data: {
        status: "REJECTED",
        respondedAt: new Date(),
      },
    });

    return acceptedResponse;
  });
};

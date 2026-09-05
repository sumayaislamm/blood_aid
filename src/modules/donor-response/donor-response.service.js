import { prisma } from "../../lib/prisma";
export const createDonorResponse = async (donorId, data) => {
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
export const getMyDonorResponses = async (donorId) => {
    const responses = await prisma.donorResponse.findMany({
        where: {
            donorId,
        },
        include: {
            bloodRequest: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return responses;
};
// Update a donor response for a specific donor
export const updateMyDonorResponse = async (donorId, responseId, data) => {
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
export const updateDonorResponseStatus = async (requesterId, responseId, data) => {
    const response = await prisma.donorResponse.findUnique({
        where: {
            id: responseId,
        },
        include: {
            bloodRequest: true,
        },
    });
    if (!response) {
        throw new Error("Donor response not found");
    }
    if (response.bloodRequest.requesterId !== requesterId) {
        throw new Error("You can only manage responses to your own blood requests");
    }
    if (response.status !== "PENDING") {
        throw new Error("Only pending responses can be accepted or rejected");
    }
    if (data.status !== "ACCEPTED" && data.status !== "REJECTED") {
        throw new Error("Status must be ACCEPTED or REJECTED");
    }
    const updatedResponse = await prisma.donorResponse.update({
        where: {
            id: responseId,
        },
        data: {
            status: data.status,
            respondedAt: new Date(),
        },
    });
    return updatedResponse;
};
//# sourceMappingURL=donor-response.service.js.map
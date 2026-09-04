import { prisma } from "../../lib/prisma";
//Creates a new blood request in the database
export const createBloodRequest = async (requesterId, data) => {
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
export const getBloodRequestById = async (id) => {
    const request = await prisma.bloodRequest.findFirst({
        where: {
            id,
            deletedAt: null,
        },
    });
    return request;
};
//# sourceMappingURL=blood-request.service.js.map
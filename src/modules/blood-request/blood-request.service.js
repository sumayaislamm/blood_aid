import { prisma } from "../../lib/prisma";
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
//# sourceMappingURL=blood-request.service.js.map
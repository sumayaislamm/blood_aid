import { prisma } from "../../lib/prisma";
export const createDonation = async (donorId, responseId, data) => {
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
    if (response.donorId !== donorId) {
        throw new Error("You can only create donation for your own response");
    }
    if (response.status !== "ACCEPTED") {
        throw new Error("Donation can only be created for an accepted donor response");
    }
    const existingDonation = await prisma.donation.findUnique({
        where: {
            responseId,
        },
    });
    if (existingDonation) {
        throw new Error("Donation already exists for this response");
    }
    const donation = await prisma.donation.create({
        data: {
            bloodRequestId: response.bloodRequestId,
            donorId,
            responseId,
            donationDate: new Date(data.donationDate),
            units: data.units,
            status: data.status ?? "PENDING",
            ...(data.notes !== undefined && {
                notes: data.notes,
            }),
        },
    });
    return donation;
};
// Get all donations for a specific donor
export const getMyDonations = async (donorId) => {
    const donations = await prisma.donation.findMany({
        where: {
            donorId,
        },
        include: {
            bloodRequest: {
                select: {
                    id: true,
                    bloodGroup: true,
                    units: true,
                    hospitalName: true,
                    hospitalAddress: true,
                    city: true,
                    requiredDate: true,
                    urgency: true,
                    status: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    return donations;
};
export const getDonationById = async (userId, donationId) => {
    const donation = await prisma.donation.findUnique({
        where: {
            id: donationId,
        },
        include: {
            bloodRequest: true,
            donor: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                },
            },
            response: true,
        },
    });
    if (!donation) {
        throw new Error("Donation not found");
    }
    if (donation.donorId !== userId) {
        throw new Error("You can only view your own donation");
    }
    return donation;
};
//# sourceMappingURL=donation.service.js.map
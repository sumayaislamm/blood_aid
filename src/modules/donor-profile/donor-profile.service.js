import { prisma } from "../../lib/prisma";
export const createDonorProfile = async (userId, data) => {
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
export const getMyDonorProfile = async (userId) => {
    const profile = await prisma.donorProfile.findUnique({
        where: {
            userId,
        },
    });
    return profile;
};
// Update donor profile by userId
export const updateMyDonorProfile = async (userId, data) => {
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
//# sourceMappingURL=donor-profile.service.js.map
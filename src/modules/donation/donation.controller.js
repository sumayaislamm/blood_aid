import { createDonation, getDonationById, getMyDonations } from "./donation.service";
export const createDonationController = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const donation = await createDonation(req.user.userId, req.params.responseId, req.body);
        return res.status(201).json({
            success: true,
            message: "Donation created successfully",
            data: donation,
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error
            ? error.message
            : "Failed to create donation";
        return res.status(400).json({
            success: false,
            message,
        });
    }
};
// Get my donations for the authenticated donor
export const getMyDonationsController = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const donations = await getMyDonations(req.user.userId);
        return res.status(200).json({
            success: true,
            message: "My donations fetched successfully",
            data: donations,
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error
            ? error.message
            : "Failed to fetch donations";
        return res.status(400).json({
            success: false,
            message,
        });
    }
};
// Get donation by ID for the authenticated donor
export const getDonationByIdController = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const donation = await getDonationById(req.user.userId, req.params.id);
        return res.status(200).json({
            success: true,
            message: "Donation fetched successfully",
            data: donation,
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error
            ? error.message
            : "Failed to fetch donation";
        return res.status(400).json({
            success: false,
            message,
        });
    }
};
//# sourceMappingURL=donation.controller.js.map
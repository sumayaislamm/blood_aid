import { createDonation } from "./donation.service";
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
//# sourceMappingURL=donation.controller.js.map
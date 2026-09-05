import { createDonorResponse, getMyDonorResponses, updateMyDonorResponse, } from "./donor-response.service";
export const createResponse = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const response = await createDonorResponse(req.user.userId, req.body);
        return res.status(201).json({
            success: true,
            message: "Donor response created successfully",
            data: response,
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error
            ? error.message
            : "Failed to create donor response";
        return res.status(400).json({
            success: false,
            message,
        });
    }
};
// Get my donor responses for the authenticated donor
export const getMyResponses = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const responses = await getMyDonorResponses(req.user.userId);
        return res.status(200).json({
            success: true,
            message: "Donor responses fetched successfully",
            data: responses,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch donor responses",
        });
    }
};
// Update my donor response for the authenticated donor
export const updateMyResponse = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const response = await updateMyDonorResponse(req.user.userId, req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Donor response updated successfully",
            data: response,
        });
    }
    catch (error) {
        console.error(error);
        const message = error instanceof Error
            ? error.message
            : "Failed to update donor response";
        return res.status(400).json({
            success: false,
            message,
        });
    }
};
//# sourceMappingURL=donor-response.controller.js.map
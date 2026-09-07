import { createDonorResponse, getMyDonorResponses, updateDonorResponseStatus, updateMyDonorResponse, } from "./donor-response.service";
export const createResponse = async (req, res, next) => {
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
        next(error);
    }
};
// Get my donor responses for the authenticated donor
export const getMyResponses = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const result = await getMyDonorResponses(req.user.userId, req.query);
        return res.status(200).json({
            success: true,
            message: "Donor responses fetched successfully",
            data: result.responses,
            pagination: result.pagination,
        });
    }
    catch (error) {
        next(error);
    }
};
// Update my donor response for the authenticated donor
export const updateMyResponse = async (req, res, next) => {
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
        next(error);
    }
};
// Update donor response status for the authenticated donor
export const updateResponseStatus = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const response = await updateDonorResponseStatus(req.user.userId, req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Donor response status updated successfully",
            data: response,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=donor-response.controller.js.map
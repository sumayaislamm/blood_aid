import { createBloodRequest, getAllBloodRequests, getBloodRequestById, } from "./blood-request.service";
//Creates a new blood request in the database
export const createRequest = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const bloodRequest = await createBloodRequest(req.user.userId, req.body);
        return res.status(201).json({
            success: true,
            message: "Blood request created successfully",
            data: bloodRequest,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create blood request",
        });
    }
};
//Fetches all blood requests from the database
export const getAllRequests = async (_req, res) => {
    try {
        const requests = await getAllBloodRequests();
        return res.status(200).json({
            success: true,
            message: "Blood requests fetched successfully",
            data: requests,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch blood requests",
        });
    }
};
export const getRequestById = async (req, res) => {
    try {
        const { id } = req.params;
        const request = await getBloodRequestById(id);
        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Blood request not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Blood request fetched successfully",
            data: request,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch blood request",
        });
    }
};
//# sourceMappingURL=blood-request.controller.js.map
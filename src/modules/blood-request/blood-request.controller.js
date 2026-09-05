import { createBloodRequest, deleteBloodRequest, getAllBloodRequests, getBloodRequestById, updateBloodRequest, } from "./blood-request.service";
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
//Updates a blood request in the database
export const updateRequest = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { id } = req.params;
        const updatedRequest = await updateBloodRequest(id, req.user.userId, req.body);
        if (!updatedRequest) {
            return res.status(404).json({
                success: false,
                message: "Blood request not found or you do not have permission to update it",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Blood request updated successfully",
            data: updatedRequest,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update blood request",
        });
    }
};
//Deletes a blood request from the database
export const deleteRequest = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { id } = req.params;
        const deletedRequest = await deleteBloodRequest(id, req.user.userId);
        if (!deletedRequest) {
            return res.status(404).json({
                success: false,
                message: "Blood request not found or you do not have permission to delete it",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Blood request deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete blood request",
        });
    }
};
//# sourceMappingURL=blood-request.controller.js.map
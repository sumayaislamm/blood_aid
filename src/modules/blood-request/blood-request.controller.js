import { createBloodRequest } from "./blood-request.service";
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
//# sourceMappingURL=blood-request.controller.js.map
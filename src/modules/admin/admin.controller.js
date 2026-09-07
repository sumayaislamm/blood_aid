import { getAdminAuditLogs, getAdminBloodRequests, getAdminDonations, getAdminPayments, getAdminStats, getAllUsers, updateBloodRequestStatus, updateUserStatus, verifyDonation, } from "./admin.service";
export const getUsers = async (req, res, next) => {
    try {
        const result = await getAllUsers(req.query);
        return res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const changeUserStatus = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const result = await updateUserStatus(req.user.userId, req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "User status updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const verifyDonationController = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const result = await verifyDonation(req.user.userId, req.params.id);
        return res.status(200).json({
            success: true,
            message: "Donation verified successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getAdminBloodRequestsController = async (req, res, next) => {
    try {
        const result = await getAdminBloodRequests(req.query);
        return res.status(200).json({
            success: true,
            message: "Blood requests fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const updateAdminBloodRequestStatusController = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const result = await updateBloodRequestStatus(req.user.userId, req.params.id, req.body);
        return res.status(200).json({
            success: true,
            message: "Blood request status updated successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getAdminDonationsController = async (req, res, next) => {
    try {
        const result = await getAdminDonations(req.query);
        return res.status(200).json({
            success: true,
            message: "Donations fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
export const getAdminPaymentsController = async (req, res, next) => {
    try {
        const result = await getAdminPayments(req.query);
        return res.status(200).json({
            success: true,
            message: "Payments fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
// STATES
export const getAdminStatsController = async (_req, res, next) => {
    try {
        const result = await getAdminStats();
        return res.status(200).json({
            success: true,
            message: "Admin statistics fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
// audit logs
export const getAdminAuditLogsController = async (_req, res, next) => {
    try {
        const result = await getAdminAuditLogs(_req.query);
        return res.status(200).json({
            success: true,
            message: "Audit logs fetched successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=admin.controller.js.map
import { loginUser, registerUser, updateUser, googleLogin, } from "./auth.service";
import { prisma } from "../../lib/prisma";
// Register
export const register = async (req, res, next) => {
    try {
        const user = await registerUser(req.body);
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
// Login
export const login = async (req, res, next) => {
    try {
        const result = await loginUser(req.body);
        return res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
// Get Me
export const getMe = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.userId,
            },
            select: {
                id: true,
                name: true,
                email: true,
                phone: true,
                role: true,
                status: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        return res.status(200).json({
            success: true,
            message: "User profile fetched successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
// Update User Profile
export const updateMe = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const user = await updateUser(req.user.userId, req.body);
        return res.status(200).json({
            success: true,
            message: "User profile updated successfully",
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
};
// Google Auth
export const googleAuth = async (req, res, next) => {
    try {
        const result = await googleLogin(req.body);
        return res.status(200).json({
            success: true,
            message: "Google login successful",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=auth.controller.js.map
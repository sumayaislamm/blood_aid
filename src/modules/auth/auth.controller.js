import { registerUser } from "./auth.service";
export const register = async (req, res) => {
    try {
        const user = await registerUser(req.body);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : "Registration failed";
        res.status(400).json({
            success: false,
            message,
        });
    }
};
//# sourceMappingURL=auth.controller.js.map
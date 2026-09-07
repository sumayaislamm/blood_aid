export const validate = (schema) => (req, res, next) => {
    const input = req.method === "GET" || req.method === "DELETE"
        ? req.query
        : req.body;
    const result = schema.safeParse(input);
    if (!result.success) {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: result.error.issues.map((issue) => ({
                field: issue.path.join("."),
                message: issue.message,
            })),
        });
    }
    if (req.method !== "GET" && req.method !== "DELETE") {
        req.body = result.data;
    }
    next();
};
//# sourceMappingURL=validation.middleware.js.map
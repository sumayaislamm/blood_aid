export const errorHandler = (error, req, res, next) => {
    console.error(error);
    const message = error instanceof Error
        ? error.message
        : "Something went wrong";
    return res.status(500).json({
        success: false,
        message,
    });
};
//# sourceMappingURL=error.middleware.js.map
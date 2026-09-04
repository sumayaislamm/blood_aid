import express from "express";
const app = express();
app.use(express.json());
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "Blood Aid API is running",
    });
});
export default app;
//# sourceMappingURL=app.js.map

import "dotenv/config";

import app from "./app.js";
import { connectRedis } from "./config/redis.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`🚀 Blood Aid server running on port ${PORT}`);
  });
};

startServer();
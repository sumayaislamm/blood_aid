import "dotenv/config";

import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

const redisClient = createClient(
  redisUrl
    ? {
        url: redisUrl,
      }
    : undefined
);

redisClient.on("error", (error) => {
  console.error("Redis Client Error:", error);
});

let isConnecting = false;

export const connectRedis = async () => {
  if (!redisUrl) {
    console.warn("⚠️ REDIS_URL is not defined. Redis is disabled.");
    return false;
  }

  if (redisClient.isOpen) {
    return true;
  }

  if (isConnecting) {
    return false;
  }

  try {
    isConnecting = true;
    await redisClient.connect();
    console.log("✅ Redis connected");
    return true;
  } catch (error) {
    console.error("❌ Redis connection failed:", error);
    return false;
  } finally {
    isConnecting = false;
  }
};

export default redisClient;
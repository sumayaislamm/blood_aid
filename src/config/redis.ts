// import "dotenv/config";

// import { createClient } from "redis";

// const redisUrl = process.env.REDIS_URL;

// const redisClient = createClient(
//   redisUrl
//     ? {
//         url: redisUrl,
//       }
//     : undefined
// );

// redisClient.on("error", (error) => {
//   console.error("Redis Client Error:", error);
// });

// let isConnecting = false;

// export const connectRedis = async () => {
//   if (!redisUrl) {
//     console.warn("⚠️ REDIS_URL is not defined. Redis is disabled.");
//     return false;
//   }

//   if (redisClient.isOpen) {
//     return true;
//   }

//   if (isConnecting) {
//     return false;
//   }

//   try {
//     isConnecting = true;
//     await redisClient.connect();
//     console.log("✅ Redis connected");
//     return true;
//   } catch (error) {
//     console.error("❌ Redis connection failed:", error);
//     return false;
//   } finally {
//     isConnecting = false;
//   }
// };

// export default redisClient;



import "dotenv/config";
import { createClient } from "redis";

const redisUrl = process.env.REDIS_URL;

const redisClient = createClient(
  redisUrl
    ? {
        url: redisUrl,
        socket: {
          reconnectStrategy: (retries) => {
            if (retries > 5) {
              return new Error("Redis reconnect limit reached");
            }

            return Math.min(retries * 200, 3000);
          },
        },
      }
    : undefined
);

redisClient.on("error", (error) => {
  console.error("Redis Client Error:", error);
});

redisClient.on("connect", () => {
  console.log("🔄 Redis connecting...");
});

redisClient.on("ready", () => {
  console.log("✅ Redis ready");
});

redisClient.on("end", () => {
  console.warn("⚠️ Redis connection closed");
});

let connectPromise: Promise<boolean> | null = null;

export const connectRedis = async (): Promise<boolean> => {
  if (!redisUrl) {
    console.warn("⚠️ REDIS_URL is not defined. Redis is disabled.");
    return false;
  }

  if (redisClient.isReady) {
    return true;
  }

  if (connectPromise) {
    return connectPromise;
  }

  connectPromise = (async () => {
    try {
      if (!redisClient.isOpen) {
        await redisClient.connect();
      }

      return redisClient.isReady;
    } catch (error) {
      console.error("❌ Redis connection failed:", error);
      return false;
    } finally {
      connectPromise = null;
    }
  })();

  return connectPromise;
};

export default redisClient;

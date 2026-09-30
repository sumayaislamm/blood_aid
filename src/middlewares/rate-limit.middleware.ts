// import rateLimit from "express-rate-limit";
// import { RedisStore } from "rate-limit-redis";
// import redisClient from "../config/redis.js";

// const redisStore =
//   process.env.REDIS_URL
//     ? new RedisStore({
//         sendCommand: (...args: string[]) =>
//           redisClient.sendCommand(args),
//       })
//     : undefined;

// export const authRateLimiter = rateLimit({
//   ...(redisStore ? { store: redisStore } : {}),
//   windowMs: 15 * 60 * 1000,
//   limit: 10,
//   standardHeaders: "draft-8",
//   legacyHeaders: false,
//   message: {
//     success: false,
//     message: "Too many authentication attempts. Please try again later.",
//   },
// });


// import rateLimit from "express-rate-limit";
// import { RedisStore } from "rate-limit-redis";

// import redisClient from "../config/redis.js";
// import { connectRedis } from "../config/redis.js";

// const redisStore = process.env.REDIS_URL
//   ? new RedisStore({
//       sendCommand: async (...args: string[]) => {
//         const connected = await connectRedis();

//         if (!connected || !redisClient.isReady) {
//           throw new Error("Redis is unavailable");
//         }

//         return redisClient.sendCommand(args);
//       },
//     })
//   : undefined;

// export const authRateLimiter = rateLimit({
//   ...(redisStore ? { store: redisStore } : {}),

//   windowMs: 15 * 60 * 1000,

//   limit: 10,

//   standardHeaders: "draft-8",

//   legacyHeaders: false,

//   // If Redis is unavailable, don't make login/register return 500.
//   passOnStoreError: true,

//   message: {
//     success: false,
//     message: "Too many authentication attempts. Please try again later.",
//   },
// });




import rateLimit from "express-rate-limit";

export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many authentication attempts. Please try again later.",
  },
});
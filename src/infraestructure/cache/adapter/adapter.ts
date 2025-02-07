import { Redis } from "ioredis";
import { ENV } from "../../env";

export const cache = new Redis(
  `redis://${ENV.REDIS_USER}:${ENV.REDIS_PASSWORD}@${ENV.REDIS_HOST}:${ENV.REDIS_PORT}`
);
cache.on("connect", () => console.log("Redis connected succesfully"));
cache.on("error", (err) => console.log("Redis Error: " + err.message));

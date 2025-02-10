import { Redis } from "ioredis";
import { ENV } from "../../env";
import RedisMock from "ioredis-mock";

export const cache = process.env.JEST_WORKER_ID
  ? new RedisMock()
  : new Redis(
      `redis://${ENV.REDIS_USER}:${ENV.REDIS_PASSWORD}@${ENV.REDIS_HOST}:${ENV.REDIS_PORT}`
    );
cache.on("connect", () => console.log("Redis connected succesfully"));
cache.on("error", (err) => console.log("Redis Error: " + err.message));

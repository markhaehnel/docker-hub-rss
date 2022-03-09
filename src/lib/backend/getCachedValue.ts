import Redis from "ioredis";
import { logDebug, logError, logInfo } from "./logger";

const redis = new Redis(
  process.env.REDIS_CONNECTIONSTRING || "redis://localhost:6379"
);

redis.on("error", (error) => logError(error));
redis.on("connect", (error) => logInfo("Redis connected"));
redis.on("reconnecting", (error) => logInfo("Redis is reconnecting"));

const getCachedValue = async <T>(
  key: string,
  fetchFunction: () => Promise<T>
): Promise<T> => {
  const normalizedKey = key.trim().toUpperCase();
  logDebug(`Getting from cache ${normalizedKey}`);

  const cachedValue = await redis.get(normalizedKey);
  logDebug(`Got form cache  ${normalizedKey}`);
  if (cachedValue) {
    logDebug(`Returning cached value for ${normalizedKey}`);
    return JSON.parse(cachedValue);
  }

  logDebug(`No cache entry found for ${normalizedKey}`);
  const data = await fetchFunction();
  await redis.set(normalizedKey, JSON.stringify(data), "ex", 600);

  return data;
};

export { getCachedValue };

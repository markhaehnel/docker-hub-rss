import { createLogger } from "bunyan";

const isProduction = process.env.NODE_ENV === "production";

const getContext = () => {
  const error = new Error("_");
  return error.stack?.split("at ")[3].split(" (")[0];
};

const logger = createLogger({
  name: "docker-hub-rss",
  level: isProduction ? "info" : "debug",
});

const logInfo = (message: string, object?: object) =>
  logger.info({ object, component: getContext() }, message);

const logDebug = (message: string, object?: object) =>
  logger.debug({ object, component: getContext() }, message);

const logError = (error: Error) => logger.error(error);

export { logInfo, logDebug, logError };

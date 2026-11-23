import { getColorDepth } from "./color-depth.mjs";
import { ENV, env, getBooleanEnvVar, getEnvVar, isDevelopment, isProduction, isTest, nodeENV } from "./env-impl.mjs";
import { TTY_COLORS, createLogger, levels, logger, shouldPublishLog } from "./logger.mjs";
import { getRuntimeName, isBun, isDeno, isNode, isWorkerd } from "./runtime.mjs";
export { ENV, TTY_COLORS, createLogger, env, getBooleanEnvVar, getColorDepth, getEnvVar, getRuntimeName, isBun, isDeno, isDevelopment, isNode, isProduction, isTest, isWorkerd, levels, logger, nodeENV, shouldPublishLog };

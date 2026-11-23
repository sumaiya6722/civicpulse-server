import { getColorDepth } from "./color-depth.mjs";
import { ENV, EnvObject, env, getBooleanEnvVar, getEnvVar, isDevelopment, isProduction, isTest, nodeENV } from "./env-impl.mjs";
import { InternalLogger, LogHandlerParams, LogLevel, Logger, TTY_COLORS, createLogger, levels, logger, shouldPublishLog } from "./logger.mjs";
import { RuntimeName, getRuntimeName, isBun, isDeno, isNode, isWorkerd } from "./runtime.mjs";
export { ENV, type EnvObject, type InternalLogger, type LogHandlerParams, type LogLevel, type Logger, type RuntimeName, TTY_COLORS, createLogger, env, getBooleanEnvVar, getColorDepth, getEnvVar, getRuntimeName, isBun, isDeno, isDevelopment, isNode, isProduction, isTest, isWorkerd, levels, logger, nodeENV, shouldPublishLog };
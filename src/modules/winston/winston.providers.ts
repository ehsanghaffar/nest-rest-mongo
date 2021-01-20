import { Provider } from "@nestjs/common";
import { createLogger, LoggerOptions } from "winston";
import {
  WINSTON_MODULE_OPTIONS,
  WINSTON_MODULE_PROVIDER,
} from "./winston.constants";
import {
  WinstonModuleAsyncOptions,
  WinstonModuleOptions,
} from "./winston.interfaces";

/**
 * Constructor a winston provider
 * @param loggerOpts
 */
export const createWinstonProviders = (
  loggerOpts: WinstonModuleOptions,
): Provider[] => {
  return [
    {
      provide: WINSTON_MODULE_PROVIDER,
      useFactory: () => createLogger(loggerOpts),
    },
  ];
};

/**
 * Async constructor for a winston provider
 * @param options
 */
export const createWinstonAsyncProviders = (
  options: WinstonModuleAsyncOptions,
): Provider[] => {
  return [
    {
      provide: WINSTON_MODULE_OPTIONS,
      useFactory: options.useFactory,
      inject: options.inject || [],
    },
    {
      provide: WINSTON_MODULE_PROVIDER,
      useFactory: (loggerOpts: LoggerOptions) => createLogger(loggerOpts),
      inject: [WINSTON_MODULE_OPTIONS],
    },
  ];
};

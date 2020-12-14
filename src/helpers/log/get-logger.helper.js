'use strict';

const pino = require(`pino`);
const {AppEnvironment, ENV, LogLevel, LoggerName} = require(`~/common/enums`);

const LOG_FILE = `./logs/api.log`;
const isDevMode = ENV.NODE_ENV === AppEnvironment.DEVELOPMENT;
const defaultLogLevel = isDevMode ? LogLevel.INFO : LogLevel.ERROR;

const logger = pino(
    {
      name: LoggerName.BASE_LOGGER,
      level: ENV.LOG_LEVEL || defaultLogLevel,
      prettyPrint: isDevMode,
    },
    isDevMode ? process.stdout : pino.destination(LOG_FILE)
);

const getLogger = (options = {}) => {
  return logger.child(options);
};

module.exports = {
  logger,
  getLogger,
};

'use strict';

const pino = require(`pino`);
const {AppEnvironment, ENV, LogLevel} = require(`~/common/enums`);

const LOG_FILE = `./src/service/logs/api.log`;
const isDevMode = ENV.NODE_ENV === AppEnvironment.DEVELOPMENT;
const defaultLogLevel = isDevMode ? LogLevel.INFO : LogLevel.ERROR;

const loggerInstance = pino(
    {
      name: `base-logger`,
      level: ENV.LOG_LEVEL || defaultLogLevel,
      prettyPrint: isDevMode,
    },
    isDevMode ? process.stdout : pino.destination(LOG_FILE)
);

const getLogger = (options = {}) => {
  return loggerInstance.child(options);
};

module.exports = {
  getLogger,
};

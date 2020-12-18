'use strict';

const dotenv = require(`dotenv`);

dotenv.config();

const ENV = {
  NODE_ENV: process.env.NODE_ENV,
  LOG_LEVEL: process.env.LOG_LEVEL,
  API_PORT: process.env.API_PORT,
  PORT: process.env.PORT,
};

module.exports = {
  ENV,
};

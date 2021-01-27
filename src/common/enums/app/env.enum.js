'use strict';

const {
  NODE_ENV,
  LOG_LEVEL,
  API_PORT,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  SECRET,
} = process.env;

const ENV = {
  NODE_ENV,
  LOG_LEVEL,
  API_PORT,
  PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
  SECRET,
};

module.exports = {
  ENV,
};

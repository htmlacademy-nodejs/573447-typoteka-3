'use strict';

const {ENV} = require(`~/common/enums`);

const API_PORT = ENV.API_PORT || 3000;

const AppConfig = {
  PUBLIC_DIR: `public`,
  UPLOAD_DIR: `upload`,
  DEFAULT_PORT: 8080,
  API_URL: `http://localhost:${API_PORT}/api/`,
  API_TIMEOUT: 1000,
};

module.exports = {
  AppConfig,
};

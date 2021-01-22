'use strict';

const {ValidationError} = require(`joi`);
const HttpError = require(`./http-error/http-error.exception`);

module.exports = {
  ValidationError,
  HttpError,
};

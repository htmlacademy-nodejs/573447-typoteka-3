'use strict';

const {HttpError} = require(`~/common/exceptions`);

const getHttpErrors = (err) => {
  return err instanceof HttpError ? err.messages : [];
};

module.exports = {
  getHttpErrors,
};

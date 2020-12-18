'use strict';

const {SuccessHTTPStatusRange} = require(`~/common/enums`);

const checkIsOkStatusCode = (statusCode) => {
  const isOk = statusCode >= SuccessHTTPStatusRange.MIN && statusCode <= SuccessHTTPStatusRange.MAX;

  return isOk;
};

module.exports = {
  checkIsOkStatusCode,
};
